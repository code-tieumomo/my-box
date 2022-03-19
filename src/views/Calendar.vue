<template>
  <FullCalendar :options="calendarOptions" />
</template>

<script>
import "@fullcalendar/core/vdom";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default {
  name: "Calendar",
  components: {
    FullCalendar
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        dateClick: this.handleDateClick,
        events: [
          { title: "event 1", date: "2022-03-19" },
          { title: "event 2", date: "2022-03-20" }
        ],
        selectionInfo: this.handleSelect,
        eventClick: this.handleEventClick
      }
    };
  },
  methods: {
    handleDateClick: function (arg) {
      console.log("click", arg);
    },
    handleSelect: function (arg) {
      console.log("select", arg);
    },
    handleEventClick: function (arg) {
      console.log("event click", arg.event.setProp("backgroundColor", "red"));
    }
  }
};
</script>

<style scoped>

</style>