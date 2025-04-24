import { useGetCategoryQuery } from '@/api/category';
import { useGetProductQuery } from '@/api/product';
import { CategoryRow } from '@/components/categories/categories-card';
import { DeleteCategoryDialog } from '@/components/categories/delete-categories';
import ModifyCategoryDrawer from '@/components/categories/modify-categories-drawer';
import { Header } from '@/components/header';
import { DeleteProductDialog } from '@/components/products/delete-products';
import { ModifyProductDrawer } from '@/components/products/modify-product-drawer';
import { ProductRow } from '@/components/products/products-card';
import { AddIcon } from '@/components/shared/add-icon';
import { CommonTabs } from '@/components/shared/common-tabs';
import { DataLoader } from '@/components/shared/data-loader';
import { NoDataFound } from '@/components/shared/no-data-found';
import { SearchField } from '@/components/shared/search-field';
import { useAppDispatch } from '@/hooks/redux';
import { openModifyCategoryModal, openModifyProductModal } from '@/store/slices/modelSlices';
import { Category } from '@/types/category';
import { Products } from '@/types/products';
import { CONSTANTS } from '@/utils/constants';
import { PRODUCT_PAGE_OPTIONS } from '@/utils/data';
import { PLACEHOLDERS } from '@/utils/form';
import { INFO_MSG } from '@/utils/messages';
import { useState } from 'react';

function Product() {
  const [activeTab, setActiveTab] = useState<string>(PRODUCT_PAGE_OPTIONS[0].value);
  const [text, setText] = useState("");

  const { data: categories = [], isFetching: isFetchingCategories, refetch: refetchCategoryList } = useGetCategoryQuery({});
  const { data: products = [], isFetching: isFetchingProducts, refetch: refetchProductList } = useGetProductQuery({});

  const dispatch = useAppDispatch();

  const openModifyCategory = () => {
    dispatch(openModifyCategoryModal({}));
  };

  const openModifyProduct = () => {
    dispatch(openModifyProductModal({}));
  };

  return (
    <>
      <div className="h-full relative overflow-y-auto">
        <Header title={activeTab === CONSTANTS.PRODUCT ? CONSTANTS.PRODUCTS : CONSTANTS.CATEGORIES} />

        <div className="space-y-4 px-4 py-4">
          <CommonTabs data={PRODUCT_PAGE_OPTIONS} value={activeTab} onChange={setActiveTab} />

          <section className="flex gap-3 h-10">
            <SearchField value={text} placeholder={PLACEHOLDERS.SEARCH} onChange={setText} />
            <AddIcon onClick={activeTab === CONSTANTS.PRODUCT ? openModifyProduct : openModifyCategory} />
          </section>
          
          <>
            {activeTab === CONSTANTS.PRODUCT && (
              <section className="bg-background divide-y divide-input rounded-lg">
                {!isFetchingProducts && (!products?.result || products.result.length === 0) && (
                  <NoDataFound message={INFO_MSG.NO_PRODUCT_FOUND} />
                )}

                {!isFetchingProducts && Array.isArray(products?.result) && products.result.length > 0 && (
                  products.result.map((p: Products) => (
                    <ProductRow key={p.id} data={p} />
                  ))
                )}
                {isFetchingProducts && <DataLoader dataPresent={products?.result && products.result.length > 0} />}
              </section>
            )}

            {activeTab === CONSTANTS.CATEGORY && (
              <section className="bg-background divide-y divide-input rounded-lg">
                {!isFetchingCategories && (!categories?.result || categories.result.length === 0) && (
                  <NoDataFound message={INFO_MSG.NO_CATEGORY_FOUND} />
                )}

                {!isFetchingCategories && Array.isArray(categories?.result) && categories.result.length > 0 && (
                  categories.result.map((c: Category) => (
                    <CategoryRow key={c.id} data={c} />
                  ))
                )}
                {isFetchingCategories && <DataLoader dataPresent={categories?.result && categories.result.length > 0} />}
              </section>
            )}
          </>
        </div>
      </div>
      <ModifyCategoryDrawer refetchCategories={refetchCategoryList} />
      <DeleteCategoryDialog refetchCategories={refetchCategoryList} />
      <ModifyProductDrawer refetchProducts={refetchProductList}/>
      <DeleteProductDialog refetchProducts={refetchProductList}/>
    </>
  );
}

export default Product;
