import React, { useRef, useLayoutEffect } from "react";
// import axios from 'axios'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import "./styles.css";
am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_kelly);

const Map = (props) => {
  const chart = useRef(null);
  const { data } = props;

  useLayoutEffect(() => {
    let x = am4core.create("mapchart", am4maps.MapChart);
    let chart = am4core.create("chartdiv", am4charts.PieChart);
    let xychart = am4core.create("xychartdiv", am4charts.XYChart);

    x.geodata = am4geodata_worldLow;
    x.panBehavior = "rotateLongLat";
    x.projection = new am4maps.projections.Orthographic();
    xychart.marginRight = 20;
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.category = "status";
    pieSeries.dataFields.value = "percent";
    pieSeries.slices.template.propertyFields.fill = "color";
    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;
    pieSeries.slices.template.states.getKey("hover").properties.shiftRadius = 0;
    pieSeries.slices.template.states.getKey("hover").properties.scale = 0.9;

    let pieSeries2 = chart.series.push(new am4charts.PieSeries());
    pieSeries2.dataFields.category = "statuses";
    pieSeries2.dataFields.value = "percents";
    pieSeries2.slices.template.propertyFields.fill = "color";
    pieSeries2.slices.template.stroke = am4core.color("#fff");
    pieSeries2.slices.template.strokeWidth = 2;
    pieSeries2.slices.template.strokeOpacity = 1;
    pieSeries2.slices.template.states.getKey(
      "hover"
    ).properties.shiftRadius = 0;
    pieSeries2.slices.template.states.getKey("hover").properties.scale = 1.1;

    let polygonSeries = x.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    polygonSeries.nonScalingStroke = true;
    polygonSeries.strokeWidth = 0.5;

    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.nonScalingStroke = false;
    polygonTemplate.strokeWidth = 0.5;
    polygonTemplate.fill = am4core.color("#3b3b3b");
    polygonTemplate.stroke = am4core.color("#000000");
    polygonTemplate.strokeOpacity = 0.15;
    polygonTemplate.setStateOnChildren = true;
    polygonTemplate.tooltipPosition = "fixed";
    let selectedData = [];

    chart.data = [
      {
        status: "active",
        percent: 100,
        statuses: "Tested",
        percents: 100,
      },
    ];

    polygonTemplate.events.on("hit", function (ev) {
      let iso = ev.target.dataItem.dataContext.id;

      let datum = data.filter((x) => x.countryInfo.iso2 === iso);
      let continent = data.filter((x) => x.continent === datum[0].continent);
      let sel = [];

      for (let i = 0; i < 9; i++) {
        let rand = Math.floor(
          Math.random() * (continent.length - 1 - 0 + 1) + 0
        );
        sel.push({
          value: continent[rand].cases,
          country: continent[rand].country,
          active: continent[rand].active,
        });
      }
      selectedData = datum[0];
      xychart.data = sel;
      console.log(selectedData);

      chart.data = [
        {
          status: "active",
          percent: selectedData.active,
          color: "orange",
        },
        {
          status: "deaths",
          percent: selectedData.deaths,
          color: "red",
        },
        {
          status: "recovered",
          percent: selectedData.recovered,
          color: "green",
        },
        {
          statuses: "Positive",
          percents: selectedData.cases,
          color: "yellow",
        },
        {
          statuses: "Negative",
          percents: selectedData.tests,
        },
      ];
    });

    let polygonHoverState = polygonTemplate.states.create("hover");
    polygonHoverState.transitionDuration = 1400;
    polygonHoverState.properties.fill = am4core.color("#1b1b1b");

    let polygonActiveState = polygonTemplate.states.create("active");
    polygonActiveState.properties.fill = am4core.color("#0f0f0f");
    chart.innerRadius = am4core.percent(10);

    var categoryAxis = xychart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxis.title.text = "Countries";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;

    var valueAxis = xychart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Cases";

    var series = xychart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "country";
    series.name = "negative";
    series.tooltipText = "{name}: [bold]{valueY}[/]";
    series.stacked = true;

    var series2 = xychart.series.push(new am4charts.ColumnSeries());
    series2.name = "positive";
    series2.stroke = am4core.color("#CDA2AB");
    series2.strokeWidth = 3;
    series2.dataFields.valueY = "active";
    series2.dataFields.categoryX = "country";
    series2.tooltipText = "{name}: [bold]{valueY}[/]";
    series2.stacked = true;
    xychart.cursor = new am4charts.XYCursor();

    chart.current = x;

    return () => {
      x.dispose();
      chart.dispose();
      xychart.dispose();
    };
  }, [data]);

  return (
    <div className="ii">
      <div className="click">
        CLICK ON COUNTRY <br />
      </div>
      <div id="mapchart" style={{ width: "49%", height: "300px" }}></div>
      <div id="chartdiv" style={{ width: "50%", height: "350px" }}></div>
      <br />
      <br />
      <br />
      CASES IN THE SAME CONTINENT
      <div id="xychartdiv" style={{ width: "100%", height: "300px" }}></div>
    </div>
  );
};
export default Map;
