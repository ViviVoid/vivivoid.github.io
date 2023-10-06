google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    document.getElementsByClassName("Events")
    var data = google.visualization.arrayToDataTable([
        ["Task", "Hours per Week"],
        ["Academics / Academic Meetings", 19],
        ["Sleep", 14],
        ["Exercise", 4],
        ["Food", 18],
        ["Club Meetings", 14],
        ["Shower", 4],
        ["Ranked League of Legends", 3],
        ["Gaming", 12],
        ["Social Media", 7],
        ["Work on vivivoid.github.io", 1],
        ["SWE 2710 111 Hours", 4],
        ["Laundry", 3],
        ["Mage Corner Time", 10],
        ["Social", 15]
    ]);

    var options= {
        title: "Andy Dao\"s Weekly Time Consumption",
        is3D: false,
    };

    var chartElement= document.createElement("div")
    chartElement.setAttribute("id", "timeChart")

    var chart=
        new google.visualization.PieChart(chartElement);
    chart.draw(data, options);
}