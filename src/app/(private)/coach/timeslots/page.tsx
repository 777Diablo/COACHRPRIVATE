"use client";

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { api } from "@/trpc/react";
import { HiButton } from "@hidstech/common_components";
import toast from "react-hot-toast";
type Event = {
  id: string;
  start: Date;
  end: Date;
  coachId: string;
  programEnrollmentId: string | null;
  title?: string;
};
const TimeSlots = () => {
  const slotsQuery = api.meetingSlot.getAll.useQuery({
    type: "all",
    coachId: "me",
  });

  const utils = api.useUtils();
  const slotCreateMutation =  api.meetingSlot.create.useMutation({
    onSuccess: async () => {
      await utils.meetingSlot.getAll.invalidate();
      toast.success("Slot created successfully");
    },
    onError: (err) => {
      toast.error(err.message ?? "Slot creation failed");
    },
  });

  const slotDeleteMutation = api.meetingSlot.delete.useMutation({
    onSuccess: async () => {
      await utils.meetingSlot.getAll.invalidate();
      toast.success("Slot deleted successfully");
    },
    onError: (err) => {
      toast.error(err.message ?? "Slot deletion failed");
    },
  });

  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (slotsQuery.data) {
      setEvents(
        slotsQuery.data.map((slot) => ({
          start: slot.startTime,
          end: slot.endTime,
          id: slot.id,
          coachId: slot.coachId,
          programEnrollmentId: slot.programEnrollmentId,
          title: slot?.ProgramEnrollment?.user?.name ?? "",
        })),
      );
    }
  }, [slotsQuery.data]);

  const [newSlot, setNewSlot] = useState({
    start: "",
    end: "",
  });

 const handleAddSlot = async () => {
  
  if (newSlot.start && newSlot.end) {
    const startTime = new Date(newSlot.start);

    const endTime = new Date(newSlot.end);
    

  



    const now = new Date();

    if (startTime < now || endTime <= startTime) {
      alert("Invalid start or end time.");
      return;
    }


    const slots = [];

    let currentStart = new Date(startTime);
    currentStart.setHours(startTime.getHours()+ Math.ceil((startTime.getMinutes()*0.01)));
    currentStart.setMinutes(0);

    let currentEnd = new Date(endTime);
    currentEnd.setMinutes(0);



   const diffMs = currentEnd - currentStart; // Difference in milliseconds
const diffHours = diffMs / (1000 * 60 * 60); // Convert to hours

if (diffHours > 4) {
  toast("Cannot have slot greater than 4 hours");
  return;
}




    while (currentStart < currentEnd) {
    
      slots.push({
        startTime: new Date(currentStart),
        endTime: new Date(currentStart.setHours(currentStart.getHours() + 1)),
      });

    }

    console.log(slots)

    for (const slot of slots) {
     slotCreateMutation.mutate(slot);
}


    setNewSlot({ start: "", end: "" });
  } else {
    alert("Please fill both start and end time.");
  }
};

///database-> interview in 24 hours and email in 24---
// forgot password-> page



  const handleEventRemove = (id: string) => {
    if (confirm("Are you sure you want to delete this slot?")) {
      //   setEvents(events.filter((event) => event.id !== id));
      slotDeleteMutation.mutate({ id });
    }
  };
  return (
    <div className="container">
      <h1 className="section_heading mb-2">Time Slots</h1>

      <div className="section_card mb-2">
        {/* <input
          type="text"
          placeholder="Title"
          value={newSlot.title}
          onChange={(e) => setNewSlot({ ...newSlot, title: e.target.value })}
          className="mr-2 border p-2"
        /> */}
        <input
          type="datetime-local"
          value={newSlot.start}
          onChange={(e) => setNewSlot({ ...newSlot, start: e.target.value })}
          className="mr-2 border p-2"
        />
        <input
          type="datetime-local"
          value={newSlot.end}
          onChange={(e) => setNewSlot({ ...newSlot, end: e.target.value })}
          className="mr-2 border p-2"
        />
        <HiButton
          onClick={handleAddSlot}
          className="rounded bg-blue-500 px-4 py-2 text-white"
          disabled={slotCreateMutation.isPending}
        >
          Add Slot
        </HiButton>
      </div>

      <div className="section_card">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="timeGridWeek"
          editable={true}
          events={events}
          eventClassNames={(event) =>
            `bg-red-500  border-red-500 ${event.event.extendedProps.programEnrollmentId ? "" : "bg-opacity-50"}`
          }
          eventClick={(e) => handleEventRemove(e.event.id)}
        />
      </div>
    </div>
  );
};

export default TimeSlots;
