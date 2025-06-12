import { TOTAL_AVAILABLE_PSYCOMETRIC_TESTS } from "@/constant";
import { api } from "@/trpc/react";
import {
  type DropdownOptionTypes,
  HiButton,
  HiDatePicker,
  HiDropdown,
  HiModal,
} from "@hidstech/common_components";
import { format } from "date-fns";
import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";

type ChooseTimeslotProps = {
  enrollmentId: string;
  includePsycometric?: boolean;
  coachId?: string | null;
};

const ChooseTimeslot: React.FC<ChooseTimeslotProps> = ({
  enrollmentId,
  includePsycometric = false,
  coachId,
}) => {
  console.log(enrollmentId+"--"+includePsycometric+"--"+coachId+"--");
  const [isOpen, setIsOpen] = useState(false);

  const [date, setDate] = useState(new Date());
  const [selectedTimeslot, setSelectedTimeslot] = useState<DropdownOptionTypes>();

  const utils = api.useUtils();

  const psycometricTestResult = api.psycometric.getResults.useQuery({
    programEnrollmentId: enrollmentId,
    userId: "me",
  });

  const timeslotsQuery = api.meetingSlot.getAll.useQuery(
    {
      type: "available",
      isDistinct: true,
      startDate: date,
      coachId: coachId ?? undefined,
    },
    { enabled: !!date },
  );

  console.log(timeslotsQuery.error);

  const timslotMutation = api.meetingSlot.update.useMutation({
    onSuccess: async () => {
      await utils.meetingSlot.getAll.invalidate();
      // await utils.programEnrollment.getByUserId.invalidate({ id: "me" });
      await utils.programEnrollment.getByUserId.invalidate();
      toast.success("Booked Successfully");
    },
    onError: (err) => {
      toast.error(err.message ?? "Something went wrong");
    },
  });

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDateChange: React.ComponentProps<
    typeof HiDatePicker
  >["onChange"] = (date) => {
    if (date instanceof Date) {
      // if date is more than 7 days in the future, show warning
      if (date.getTime() > Date.now() + 7 * 24 * 60 * 60 * 1000) {
        toast.error("Could not book more than 7 days in advance");
        return;
      }

      // if not today's date then set time to 0:00
      if (date.getDate() !== new Date().getDate()) {
        date.setHours(0, 0, 0, 0);
      }

      // if date is in the past, show warning
      const now = new Date();
      now.setHours(0, 0, 0, 0); // sets to today's 00:00

      const selected = new Date(date);
      selected.setHours(0, 0, 0, 0); // sets to selected date's 00:00

      if (selected.getTime() < now.getTime()) {
        toast.error("Cannot book a past date");
        return;
      }

      setDate(date);
    }
  };

  const handleTimeslotChange = (value: DropdownOptionTypes) => {
    console.log("sadasdasd--ds-as-da-sd-as  "+ value.value);
    setSelectedTimeslot(value);
  };

//  const slotOptions = useMemo(() => {
//   if (!timeslotsQuery.data) return [];

//   return timeslotsQuery.data.flatMap((slot) => {
//     const slots = [];
//     const start = new Date(slot.startTime);
//     const actualEnd = new Date(slot.endTime);

//     // Force the end time to not exceed 11:59 PM of startTime's day
//     const dayEnd = new Date(start);
//     dayEnd.setHours(23, 59, 0, 0); // 11:59 PM of the same day

    

//     const end = actualEnd < dayEnd ? actualEnd : dayEnd;

//     let current = new Date(start);
//     let index = 0;

//     while (current < end) {
//       const next = new Date(current.getTime() + 60 * 60 * 1000); // 1 hour
//       if (next > end) break;

//       slots.push({
//         label: `${format(current, "hh:mm a")} - ${format(next, "hh:mm a")}`,
//         value: `${slot.id}-${index}`,
//       });

//       current = next;
//       index++;
//     }

//     return slots;
//   });
// }, [timeslotsQuery.data]);
const slotOptions = useMemo(() => {
  const selectedDate = date
  if (!timeslotsQuery.data || !selectedDate) return [];

  return timeslotsQuery.data.flatMap((slot) => {
    const slots = [];
    const day_start = new Date(selectedDate);
    day_start.setHours(0, 1, 0, 0);


    
    const actualEnd = new Date(slot.endTime);

    let start = new Date(slot.startTime);

    
    if( day_start > new Date(slot.startTime))
    {
      start = day_start;
    }
   
    // Cap end time at 11:59 PM of the selected date
    const dayEnd = new Date(selectedDate);
    dayEnd.setHours(23, 59, 0, 0);

    const end = actualEnd < dayEnd ? actualEnd : dayEnd;

    let current = new Date(start);
    let index = 0;

    while (current < end) {
      const next = new Date(current.getTime() + 60 * 60 * 1000); // 1 hour
      if (next > end) break;

      // Use selectedDate in the label instead of current's real date
      const displayDate = format(selectedDate, "dd MMM yyyy");

      slots.push({
         label: `${format(current, "hh:mm a")} - ${format(next, "hh:mm a")}`,
        value: `${slot.id}`,
      });

      current = next;
      index++;
    }

    return slots;
  });
}, [timeslotsQuery.data, date]);


  const isPsycometricCompleted = useMemo(() => {
    if (includePsycometric) {
      // check if all psycometric test is completed
      if (
        psycometricTestResult.data &&
        psycometricTestResult.data?.length < TOTAL_AVAILABLE_PSYCOMETRIC_TESTS
      ) {
        return false;
      }
    }
    return true;
  }, [includePsycometric, psycometricTestResult.data]);

  const handleBookSlot = () => {
    // check if date && timeslot is selected
    if (!date || !selectedTimeslot?.value) {
      return toast.error("Please select date and timeslot");
    }

    if (!isPsycometricCompleted) {
      return toast.error("Please complete all psycometric test");
    }

    toast.error(selectedTimeslot.value + " " + enrollmentId);

    timslotMutation.mutate({
      id: selectedTimeslot.value as string,
      programEnrollmentId: enrollmentId,
    });
  };

  return (
    <>
      <HiButton
        onClick={handleOpen}
        variant="outline"
        size="sm"
        disabled={!isPsycometricCompleted || psycometricTestResult.isLoading}
        isLoading={psycometricTestResult.isLoading}
      >
              </HiButton>
      <HiModal open={isOpen} onClose={handleClose} title="Choose Timeslot">
        <div className="space-y-4">
          {/* show date picker */}
          {/* show all available timeslots for that date */}
          {/* if selected date is more than next 7 days, show warning, Could not book more than 7 days in advance */}

          <HiDatePicker
            name="date"
            label="Date"
            selected={date}
            onChange={handleDateChange}
            dateFormat="dd-MM-yyyy"
          />

          {/* show all available timeslots in a dropdown */}
          {/* <pre>{JSON.stringify(timeslotsQuery.data, null, 2)}</pre> */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Available Timeslots</label>
            <HiDropdown
              name="timeslot"
              label="Available Timeslot"
              options={slotOptions}
              placeholder="Select Timeslot"
              value={selectedTimeslot}
              onChange={handleTimeslotChange}
            />
          </div>

          <HiButton
            onClick={handleBookSlot}
            isLoading={timslotMutation.isPending}
            className="w-full max-w-48"
          >
            Book
          </HiButton>
        </div>
      </HiModal>
    </>
  );
};

export default ChooseTimeslot;
