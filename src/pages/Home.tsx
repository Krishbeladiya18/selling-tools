import { useGetHomeCompanyApiQuery, useGetHomeProductApiQuery } from '@/api/home'
import { Header } from '@/components/header'
import { CompanyRecordsSection } from '@/components/home/company-records-section'
import { ProductRecordsSection } from '@/components/home/product-records-section'
import { DataLoader } from '@/components/shared/data-loader'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CONSTANTS, REPORT_ENTITY_TYPES } from '@/utils/constants'
import { REPORT_ENTITY_OPTIONS } from '@/utils/data'
import  { useState } from 'react'

function Home() {

    const [selectedStockOption, setSelectedStockOption] = useState<string>(REPORT_ENTITY_OPTIONS[0].value);

    const { data: companies = [], isLoading: isCompanies } = useGetHomeCompanyApiQuery({});
    const { data: products = [], isLoading: isProducts } = useGetHomeProductApiQuery({});

    return (
        <>
            <div className="h-full relative flex flex-col min-h-0">
                <Header title={CONSTANTS.HOME} />
                <div className="flex-1 min-h-0 px-4 py-4 overflow-y-auto">
                    <Tabs value={selectedStockOption} onValueChange={setSelectedStockOption}>
                        <div className="flex justify-between items-center">
                            <TabsList>
                                {REPORT_ENTITY_OPTIONS.map((o) => (
                                    <TabsTrigger key={o.value} value={o.value} className="text-sm">
                                        {o.shortLabel}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>

                        <TabsContent value={REPORT_ENTITY_TYPES.COMPANY} className="mt-2">
                            {isCompanies ? <DataLoader /> : <CompanyRecordsSection companyWiseRecords={companies?.result} />}
                        </TabsContent>

                        <TabsContent value={REPORT_ENTITY_TYPES.PRODUCT}>
                            {isProducts ? <DataLoader /> : <ProductRecordsSection productWiseRecords={products?.result} />}
                        </TabsContent>
                    </Tabs>
                </div>
                
            </div >
        </>
    )
}

export default Home