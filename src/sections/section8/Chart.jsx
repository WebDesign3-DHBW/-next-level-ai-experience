import { useLayoutEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_wdTheme from "../../theme";
import PhGrst from "../../svg/WPhGrst.svg";
import EntsorgBgb from "../../svg/WEntsorgBgb.svg";
import Fahrzeugbau from "../../svg/WFahrzeugbau.svg";
import Finanzdienstleist from "../../svg/WFinanzdienstleist.svg";
import Großhandel from "../../svg/WGroßhandel.svg";
import IKT from "../../svg/WIKT.svg";
import Maschinb from "../../svg/WMaschinb.svg";
import SonstVerarbGew from "../../svg/WSonstVerarbGew.svg";
import SonstDienstleist from "../../svg/WSonstDienstleist.svg";
import UnternnaheDienstl from "../../svg/WUnternnaheDienstl.svg";
import VerkehrLogistik from "../../svg/WVerkehrLogistik.svg";

am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_wdTheme);

function Chart() {
  const chart = useRef(null);

  useLayoutEffect(() => {
    var x = am4core.create("treemap", am4charts.TreeMap);

    // Add data
    x.data = [
      {
        branch: "Finanzdienstleist.",
        color: "#78DF6C",
        value: 17.3,
        icon: Finanzdienstleist,
      },
      {
        branch: "Fahrzeugbau",
        color: "#FFF8F9",
        value: 3.3,
        icon: Fahrzeugbau,
      },
      {
        branch: "Verkehr, Logistik",
        color: "#4CC8DD",
        value: 1.5,
        icon: VerkehrLogistik,
      },
      {
        branch: "Untern.nahe Dienstl.",
        color: "#FA2662",
        value: 4.8,
        icon: UnternnaheDienstl,
      },
      {
        branch: "Ver-/Entsorg., Bg.b.",
        color: "#BB57FE",
        value: 4.5,
        icon: EntsorgBgb,
      },
      {
        branch: "Chemie/Ph., Gr.st.",
        color: "#0FAA94",
        value: 3.6,
        icon: PhGrst,
      },
      {
        branch: "Elektrot./Maschin.b.",
        color: "#F09443",
        value: 4.9,
        icon: Maschinb,
      },
      {
        branch: "Sonst. Verarb. Gew.",
        color: "#E1AAFE",
        value: 6,
        icon: SonstVerarbGew,
      },
      {
        branch: "IKT",
        color: "#EDE750",
        value: 9,
        icon: IKT,
      },
      {
        branch: "Großhandel",
        color: "#FF00FF",
        value: 4.3,
        icon: Großhandel,
      },
      {
        branch: "Sonst. Dienstleist.",
        color: "#4985D4",
        value: 0.8,
        icon: SonstDienstleist,
      },
    ];

    x.dataFields.value = "value";
    x.dataFields.name = "branch";
    x.dataFields.color = "color";

    // level 0 series template
    var seriesTemplate = x.seriesTemplates.create("0");
    seriesTemplate.strokeWidth = 2;

    // by default only current level series bullets are visible, but as we need brand bullets to be visible all the time, we modify it's hidden state
    seriesTemplate.bulletsContainer.hiddenState.properties.opacity = 1;
    seriesTemplate.bulletsContainer.hiddenState.properties.visible = true;
    // create hover state
    var columnTemplate = seriesTemplate.columns.template;

    var hoverState = columnTemplate.states.create("hover");

    // darken
    hoverState.adapter.add("fill", function (fill, target) {
      if (fill instanceof am4core.Color) {
        return am4core.color(am4core.colors.brighten(fill.rgb, -0.2));
      }
      return fill;
    });

    // add logo
    var image = columnTemplate.createChild(am4core.Image);
    image.opacity = 0.3;
    image.align = "center";
    image.valign = "middle";
    image.width = am4core.percent(80);
    image.height = am4core.percent(80);

    // add adapter for href to load correct image
    image.adapter.add("href", function (href, target) {
      var dataItem = target.parent.dataItem;
      if (dataItem) {
        return dataItem.treeMapDataItem._dataContext.icon; // geht bestimmt schöner
      }
    });

    var centerText = seriesTemplate.bullets.push(new am4charts.LabelBullet());
    centerText.locationX = 0.5;
    centerText.locationY = 0.5;
    centerText.label.text = "{value}";
    centerText.label.scale = 1.3;
    centerText.label.fill = am4core.color("#dddddd");

    x.logo.disabled = true;
    chart.current = x;

    return () => {
      x.dispose();
    };
  }, []);
  return <div id="treemap" style={{ width: "100%", height: "600px" }}></div>;
}

export default Chart;
