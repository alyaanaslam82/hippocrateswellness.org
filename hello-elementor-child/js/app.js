jQuery(document).ready(function($) {
    $('#Filter_month').on('change', function() {
        var selectedMonth = $(this).val();
        var currentUrl = new URL(window.location.href);
        if (selectedMonth) {
            currentUrl.searchParams.set('month', selectedMonth);
        } else {
            currentUrl.searchParams.delete('month');
        }
        window.location.href = currentUrl.toString();
    });


    jQuery('.event_google a').on('click', function(e) {
        e.preventDefault();

        // Extract event details from data attributes
        var title = encodeURIComponent($(this).data('title'));
        var description = encodeURIComponent($(this).data('desc'));
        var location = encodeURIComponent($(this).data('address'));

        // Parse and format start and end times
        var date = $(this).data('date'); // e.g., "April 17, 2025"
        var startTime = $(this).data('starttime'); // e.g., "12:00 pm"
        var endTime = $(this).data('endtime'); // e.g., "4:00 am"

        // Combine date and time into ISO format
        var startDateTime = new Date(date + ' ' + startTime);
        var endDateTime = new Date(date + ' ' + endTime);

        // Adjust for events that end after midnight
        if (endDateTime < startDateTime) {
            endDateTime.setDate(endDateTime.getDate() + 1);
        }

        // Format dates to 'YYYYMMDDTHHMMSSZ'
        function formatDateTime(dateObj) {
            var year = dateObj.getUTCFullYear();
            var month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
            var day = String(dateObj.getUTCDate()).padStart(2, '0');
            var hours = String(dateObj.getUTCHours()).padStart(2, '0');
            var minutes = String(dateObj.getUTCMinutes()).padStart(2, '0');
            var seconds = String(dateObj.getUTCSeconds()).padStart(2, '0');
            return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
        }

        var start = formatDateTime(startDateTime);
        var end = formatDateTime(endDateTime);

        // Construct the Google Calendar event URL
        var calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${description}&location=${location}&sf=true&output=xml`;

        // Open the URL in a new tab
        window.open(calendarUrl, '_blank');
    });

});