import moment from "moment";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { INFO_MSG } from "@/utils/messages";
import { CommonModifyDrawer } from "../shared/common-modify-drawer";
import { CompleteProductionForm, completeProductionSchema } from "@/schemas/production";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CONSTANTS } from "@/utils/constants";
import { Form } from "../ui/form";
import { CommonInputDate } from "../shared/form/common-date-input";
import { LABELS, NAMES, PLACEHOLDERS } from "@/utils/form";
import { useEffect } from "react";
import { closeCompleteProductionModal } from "@/store/slices/modelSlices";

interface CompleteProductionDialogProps {
  onComplete: (values: CompleteProductionForm) => any;
}

export const CompleteProductionDialog = ({ onComplete }: CompleteProductionDialogProps) => {
  const { open, data } = useAppSelector((state) => state.modal.completeProduction);
  const dispatch = useAppDispatch();

  const completeProductionForm = useForm<CompleteProductionForm>({
    resolver: zodResolver(completeProductionSchema),
    defaultValues: { date: undefined },
  });

  useEffect(() => {
    if (data.startDate) {
      const today = new Date();

      if (moment(data.initialDate).startOf("day").isSameOrAfter(moment(today).startOf("day"))) {
        completeProductionForm.setValue("date", data.startDate);
      } else {
        completeProductionForm.setValue("date", today);
      }
    }
  }, [data]);

  const closeDrawer = () => {
    completeProductionForm.reset();

    dispatch(closeCompleteProductionModal());
  };

  const completeProduction = () => {
    const values = completeProductionForm.getValues();
    onComplete(values);

    closeDrawer();
  };

  const submitForm = () => {
    completeProductionForm.handleSubmit(completeProduction)();
  };

  return (
    <CommonModifyDrawer
      open={open}
      onClose={closeDrawer}
      title={INFO_MSG.COMPLETE_PRODUCTION}
      actionChild={CONSTANTS.COMPLETE}
      onSave={submitForm}
    >
      <Form {...completeProductionForm}>
        <form id={CONSTANTS.CATEGORY_FORM} className="w-full flex flex-col gap-y-4">
          <CommonInputDate
            name={NAMES.COMPLETED_DATE}
            label={LABELS.COMPLETED_DATE}
            placeholder={PLACEHOLDERS.COMPLETED_DATE}
            control={completeProductionForm.control}
          />
        </form>
      </Form>
    </CommonModifyDrawer>
  );
};
