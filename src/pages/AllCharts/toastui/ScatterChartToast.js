import React from "react"

import "tui-chart/dist/tui-chart.css"
import { ScatterChart } from "@toast-ui/react-chart"
import TuiChart from "tui-chart"
import "./toastui.scss"

const theme = {
  chart: {
    background: {
      color: "#fff",
      opacity: 0
    }
  },
  title: {
    color: "#8791af"
  },
  xAxis: {
    title: {
      color: "#8791af"
    },
    label: {
      color: "#8791af"
    },
    tickColor: "#8791af"
  },
  yAxis: {
    title: {
      color: "#8791af"
    },
    label: {
      color: "#8791af"
    },
    tickColor: "#8791af"
  },
  plot: {
    lineColor: "rgba(166, 176, 207, 0.1)"
  },
  legend: {
    label: {
      color: "#8791af"
    }
  },
  series: {
    colors: ["#34c38f", "#556ee6"]
  }
}
TuiChart.registerTheme("scrollitTheme", theme)

const ScatterChartToast = props => {
  const data = {
    series: [
      {
        name: "male",
        data: [
          { x: 174, y: 65.6 },
          { x: 175.3, y: 71.8 },
          { x: 193.5, y: 80.7 },
          { x: 186.5, y: 72.6 },
          { x: 187.2, y: 78.8 },
          { x: 181.5, y: 74.8 },
          { x: 184, y: 86.4 },
          { x: 184.5, y: 78.4 },
          { x: 175, y: 62 },
          { x: 184, y: 81.6 },
          { x: 180, y: 76.6 },
          { x: 177.8, y: 83.6 },
          { x: 192, y: 90 },
          { x: 176, y: 74.6 },
          { x: 174, y: 71 },
          { x: 184, y: 79.6 },
          { x: 192.7, y: 93.8 },
          { x: 171.5, y: 70 },
          { x: 173, y: 72.4 },
          { x: 176, y: 85.9 },
          { x: 176, y: 78.8 },
          { x: 180.5, y: 77.8 },
          { x: 172.7, y: 66.2 },
          { x: 176, y: 86.4 },
          { x: 173.5, y: 81.8 },
          { x: 178, y: 89.6 },
          { x: 180.3, y: 82.8 },
          { x: 180.3, y: 76.4 },
          { x: 164.5, y: 63.2 },
          { x: 173, y: 60.9 },
          { x: 183.5, y: 74.8 },
          { x: 175.5, y: 70 },
          { x: 188, y: 72.4 },
          { x: 189.2, y: 84.1 },
          { x: 172.8, y: 69.1 },
          { x: 170, y: 59.5 },
          { x: 182, y: 67.2 },
          { x: 170, y: 61.3 },
          { x: 177.8, y: 68.6 },
          { x: 184.2, y: 80.1 },
          { x: 186.7, y: 87.8 },
          { x: 171.4, y: 84.7 },
          { x: 172.7, y: 73.4 },
          { x: 175.3, y: 72.1 },
          { x: 180.3, y: 82.6 },
          { x: 182.9, y: 88.7 },
          { x: 188, y: 84.1 },
          { x: 177.2, y: 94.1 },
          { x: 172.1, y: 74.9 },
          { x: 167, y: 59.1 },
          { x: 169.5, y: 75.6 },
          { x: 174, y: 86.2 },
          { x: 172.7, y: 75.3 },
          { x: 182.2, y: 87.1 },
          { x: 164.1, y: 55.2 },
          { x: 163, y: 57 },
          { x: 171.5, y: 61.4 },
          { x: 184.2, y: 76.8 },
          { x: 174, y: 86.8 },
          { x: 174, y: 72.2 },
          { x: 177, y: 71.6 },
          { x: 186, y: 84.8 },
          { x: 167, y: 68.2 },
          { x: 171.8, y: 66.1 },
          { x: 182, y: 72 },
          { x: 167, y: 64.6 },
          { x: 177.8, y: 74.8 },
          { x: 164.5, y: 70 },
          { x: 192, y: 101.6 },
          { x: 175.5, y: 63.2 },
          { x: 171.2, y: 79.1 },
          { x: 181.6, y: 78.9 },
          { x: 167.4, y: 67.7 },
          { x: 181.1, y: 66 },
          { x: 177, y: 68.2 },
          { x: 174.5, y: 63.9 },
          { x: 177.5, y: 72 },
          { x: 170.5, y: 56.8 },
          { x: 182.4, y: 74.5 },
          { x: 197.1, y: 90.9 },
          { x: 180.1, y: 93 },
          { x: 175.5, y: 80.9 },
          { x: 180.6, y: 72.7 },
          { x: 184.4, y: 68 },
          { x: 175.5, y: 70.9 },
          { x: 180.6, y: 72.5 },
          { x: 177, y: 72.5 },
          { x: 177.1, y: 83.4 },
          { x: 181.6, y: 75.5 },
          { x: 176.5, y: 73 },
          { x: 175, y: 70.2 },
          { x: 174, y: 73.4 },
          { x: 165.1, y: 70.5 },
          { x: 177, y: 68.9 },
          { x: 192, y: 102.3 },
          { x: 176.5, y: 68.4 },
          { x: 169.4, y: 65.9 },
          { x: 182.1, y: 75.7 },
          { x: 179.8, y: 84.5 },
          { x: 175.3, y: 87.7 },
          { x: 184.9, y: 86.4 },
          { x: 177.3, y: 73.2 },
          { x: 167.4, y: 53.9 },
          { x: 178.1, y: 72 },
          { x: 168.9, y: 55.5 },
          { x: 157.2, y: 58.4 },
          { x: 180.3, y: 83.2 },
          { x: 170.2, y: 72.7 },
          { x: 177.8, y: 64.1 },
          { x: 172.7, y: 72.3 },
          { x: 165.1, y: 65 },
          { x: 186.7, y: 86.4 },
          { x: 165.1, y: 65 },
          { x: 174, y: 88.6 },
          { x: 175.3, y: 84.1 },
          { x: 185.4, y: 66.8 },
          { x: 177.8, y: 75.5 },
          { x: 180.3, y: 93.2 },
          { x: 180.3, y: 82.7 },
          { x: 177.8, y: 58 },
          { x: 177.8, y: 79.5 },
          { x: 177.8, y: 78.6 },
          { x: 177.8, y: 71.8 },
          { x: 177.8, y: 116.4 },
          { x: 163.8, y: 72.2 },
          { x: 188, y: 83.6 },
          { x: 198.1, y: 85.5 },
          { x: 175.3, y: 90.9 },
          { x: 166.4, y: 85.9 },
          { x: 190.5, y: 89.1 },
          { x: 166.4, y: 75 },
          { x: 177.8, y: 77.7 },
          { x: 179.7, y: 86.4 },
          { x: 172.7, y: 90.9 },
          { x: 190.5, y: 73.6 },
          { x: 185.4, y: 76.4 },
          { x: 168.9, y: 69.1 },
          { x: 167.6, y: 84.5 },
          { x: 175.3, y: 64.5 },
          { x: 170.2, y: 69.1 },
          { x: 190.5, y: 108.6 },
          { x: 177.8, y: 86.4 },
          { x: 190.5, y: 80.9 },
          { x: 177.8, y: 87.7 },
          { x: 184.2, y: 94.5 },
          { x: 176.5, y: 80.2 },
          { x: 177.8, y: 72 },
          { x: 180.3, y: 71.4 },
          { x: 171.4, y: 72.7 },
          { x: 172.7, y: 84.1 },
          { x: 172.7, y: 76.8 },
          { x: 177.8, y: 63.6 },
          { x: 177.8, y: 80.9 },
          { x: 182.9, y: 80.9 },
          { x: 170.2, y: 85.5 },
          { x: 167.6, y: 68.6 },
          { x: 175.3, y: 67.7 },
          { x: 165.1, y: 66.4 },
          { x: 185.4, y: 102.3 },
          { x: 181.6, y: 70.5 },
          { x: 172.7, y: 95.9 },
          { x: 190.5, y: 84.1 },
          { x: 179.1, y: 87.3 },
          { x: 175.3, y: 71.8 },
          { x: 170.2, y: 65.9 },
          { x: 193, y: 95.9 },
          { x: 171.4, y: 91.4 },
          { x: 177.8, y: 81.8 },
          { x: 177.8, y: 96.8 },
          { x: 167.6, y: 69.1 },
          { x: 167.6, y: 82.7 },
          { x: 180.3, y: 75.5 },
          { x: 182.9, y: 79.5 },
          { x: 176.5, y: 73.6 },
          { x: 186.7, y: 91.8 },
          { x: 188, y: 84.1 },
          { x: 188, y: 85.9 },
          { x: 177.8, y: 81.8 },
          { x: 174, y: 82.5 },
          { x: 177.8, y: 80.5 },
          { x: 171.4, y: 70 },
          { x: 185.4, y: 81.8 },
          { x: 185.4, y: 84.1 },
          { x: 188, y: 90.5 },
          { x: 188, y: 91.4 },
          { x: 182.9, y: 89.1 },
          { x: 176.5, y: 85 },
          { x: 175.3, y: 69.1 },
          { x: 175.3, y: 73.6 },
          { x: 188, y: 80.5 },
          { x: 188, y: 82.7 },
          { x: 175.3, y: 86.4 },
          { x: 170.5, y: 67.7 },
          { x: 179.1, y: 92.7 },
          { x: 177.8, y: 93.6 },
          { x: 175.3, y: 70.9 },
          { x: 182.9, y: 75 },
          { x: 170.8, y: 93.2 },
          { x: 188, y: 93.2 },
          { x: 180.3, y: 77.7 },
          { x: 177.8, y: 61.4 },
          { x: 185.4, y: 94.1 },
          { x: 168.9, y: 75 },
          { x: 185.4, y: 83.6 },
          { x: 180.3, y: 85.5 },
          { x: 174, y: 73.9 },
          { x: 167.6, y: 66.8 },
          { x: 182.9, y: 87.3 },
          { x: 160, y: 72.3 },
          { x: 180.3, y: 88.6 },
          { x: 167.6, y: 75.5 },
          { x: 186.7, y: 101.4 },
          { x: 175.3, y: 91.1 },
          { x: 175.3, y: 67.3 },
          { x: 175.9, y: 77.7 },
          { x: 175.3, y: 81.8 },
          { x: 179.1, y: 75.5 },
          { x: 181.6, y: 84.5 },
          { x: 177.8, y: 76.6 },
          { x: 182.9, y: 85 },
          { x: 177.8, y: 102.5 },
          { x: 184.2, y: 77.3 },
          { x: 179.1, y: 71.8 },
          { x: 176.5, y: 87.9 },
          { x: 188, y: 94.3 },
          { x: 174, y: 70.9 },
          { x: 167.6, y: 64.5 },
          { x: 170.2, y: 77.3 },
          { x: 167.6, y: 72.3 },
          { x: 188, y: 87.3 },
          { x: 174, y: 80 },
          { x: 176.5, y: 82.3 },
          { x: 180.3, y: 73.6 },
          { x: 167.6, y: 74.1 },
          { x: 188, y: 85.9 },
          { x: 180.3, y: 73.2 },
          { x: 167.6, y: 76.3 },
          { x: 183, y: 65.9 },
          { x: 183, y: 90.9 },
          { x: 179.1, y: 89.1 },
          { x: 170.2, y: 62.3 },
          { x: 177.8, y: 82.7 },
          { x: 179.1, y: 79.1 },
          { x: 190.5, y: 98.2 },
          { x: 177.8, y: 84.1 },
          { x: 180.3, y: 83.2 },
          { x: 180.3, y: 83.2 },
        ],
      },
      {
        name: "female",
        data: [
          { x: 161.2, y: 51.6 },
          { x: 167.5, y: 59 },
          { x: 159.5, y: 49.2 },
          { x: 157, y: 63 },
          { x: 155.8, y: 53.6 },
          { x: 170, y: 59 },
          { x: 159.1, y: 47.6 },
          { x: 166, y: 69.8 },
          { x: 176.2, y: 66.8 },
          { x: 160.2, y: 75.2 },
          { x: 172.5, y: 55.2 },
          { x: 170.9, y: 54.2 },
          { x: 172.9, y: 62.5 },
          { x: 153.4, y: 42 },
          { x: 160, y: 50 },
          { x: 147.2, y: 49.8 },
          { x: 168.2, y: 49.2 },
          { x: 175, y: 73.2 },
          { x: 157, y: 47.8 },
          { x: 167.6, y: 68.8 },
          { x: 159.5, y: 50.6 },
          { x: 175, y: 82.5 },
          { x: 166.8, y: 57.2 },
          { x: 176.5, y: 87.8 },
          { x: 170.2, y: 72.8 },
          { x: 174, y: 54.5 },
          { x: 173, y: 59.8 },
          { x: 179.9, y: 67.3 },
          { x: 170.5, y: 67.8 },
          { x: 160, y: 47 },
          { x: 154.4, y: 46.2 },
          { x: 162, y: 55 },
          { x: 176.5, y: 83 },
          { x: 160, y: 54.4 },
          { x: 152, y: 45.8 },
          { x: 162.1, y: 53.6 },
          { x: 170, y: 73.2 },
          { x: 160.2, y: 52.1 },
          { x: 161.3, y: 67.9 },
          { x: 166.4, y: 56.6 },
          { x: 168.9, y: 62.3 },
          { x: 163.8, y: 58.5 },
          { x: 167.6, y: 54.5 },
          { x: 160, y: 50.2 },
          { x: 161.3, y: 60.3 },
          { x: 167.6, y: 58.3 },
          { x: 165.1, y: 56.2 },
          { x: 160, y: 50.2 },
          { x: 170, y: 72.9 },
          { x: 157.5, y: 59.8 },
          { x: 167.6, y: 61 },
          { x: 160.7, y: 69.1 },
          { x: 163.2, y: 55.9 },
          { x: 152.4, y: 46.5 },
          { x: 157.5, y: 54.3 },
          { x: 168.3, y: 54.8 },
          { x: 180.3, y: 60.7 },
          { x: 165.5, y: 60 },
          { x: 165, y: 62 },
          { x: 164.5, y: 60.3 },
          { x: 156, y: 52.7 },
          { x: 160, y: 74.3 },
          { x: 163, y: 62 },
          { x: 165.7, y: 73.1 },
          { x: 161, y: 80 },
          { x: 162, y: 54.7 },
          { x: 166, y: 53.2 },
          { x: 174, y: 75.7 },
          { x: 172.7, y: 61.1 },
          { x: 167.6, y: 55.7 },
          { x: 151.1, y: 48.7 },
          { x: 164.5, y: 52.3 },
          { x: 163.5, y: 50 },
          { x: 152, y: 59.3 },
          { x: 169, y: 62.5 },
          { x: 164, y: 55.7 },
          { x: 161.2, y: 54.8 },
          { x: 155, y: 45.9 },
          { x: 170, y: 70.6 },
          { x: 176.2, y: 67.2 },
          { x: 170, y: 69.4 },
          { x: 162.5, y: 58.2 },
          { x: 170.3, y: 64.8 },
          { x: 164.1, y: 71.6 },
          { x: 169.5, y: 52.8 },
          { x: 163.2, y: 59.8 },
          { x: 154.5, y: 49 },
          { x: 159.8, y: 50 },
          { x: 173.2, y: 69.2 },
          { x: 170, y: 55.9 },
          { x: 161.4, y: 63.4 },
          { x: 169, y: 58.2 },
          { x: 166.2, y: 58.6 },
          { x: 159.4, y: 45.7 },
          { x: 162.5, y: 52.2 },
          { x: 159, y: 48.6 },
          { x: 162.8, y: 57.8 },
          { x: 159, y: 55.6 },
          { x: 179.8, y: 66.8 },
          { x: 162.9, y: 59.4 },
          { x: 161, y: 53.6 },
          { x: 151.1, y: 73.2 },
          { x: 168.2, y: 53.4 },
          { x: 168.9, y: 69 },
          { x: 173.2, y: 58.4 },
          { x: 171.8, y: 56.2 },
          { x: 178, y: 70.6 },
          { x: 164.3, y: 59.8 },
          { x: 163, y: 72 },
          { x: 168.5, y: 65.2 },
          { x: 166.8, y: 56.6 },
          { x: 172.7, y: 105.2 },
          { x: 163.5, y: 51.8 },
          { x: 169.4, y: 63.4 },
          { x: 167.8, y: 59 },
          { x: 159.5, y: 47.6 },
          { x: 167.6, y: 63 },
          { x: 161.2, y: 55.2 },
          { x: 160, y: 45 },
          { x: 163.2, y: 54 },
          { x: 162.2, y: 50.2 },
          { x: 161.3, y: 60.2 },
          { x: 149.5, y: 44.8 },
          { x: 157.5, y: 58.8 },
          { x: 163.2, y: 56.4 },
          { x: 172.7, y: 62 },
          { x: 155, y: 49.2 },
          { x: 156.5, y: 67.2 },
          { x: 164, y: 53.8 },
          { x: 160.9, y: 54.4 },
          { x: 162.8, y: 58 },
          { x: 167, y: 59.8 },
          { x: 160, y: 54.8 },
          { x: 160, y: 43.2 },
          { x: 168.9, y: 60.5 },
          { x: 158.2, y: 46.4 },
          { x: 156, y: 64.4 },
          { x: 160, y: 48.8 },
          { x: 167.1, y: 62.2 },
          { x: 158, y: 55.5 },
          { x: 167.6, y: 57.8 },
          { x: 156, y: 54.6 },
          { x: 162.1, y: 59.2 },
          { x: 173.4, y: 52.7 },
          { x: 159.8, y: 53.2 },
          { x: 170.5, y: 64.5 },
          { x: 159.2, y: 51.8 },
          { x: 157.5, y: 56 },
          { x: 161.3, y: 63.6 },
          { x: 162.6, y: 63.2 },
          { x: 160, y: 59.5 },
          { x: 168.9, y: 56.8 },
          { x: 165.1, y: 64.1 },
          { x: 162.6, y: 50 },
          { x: 165.1, y: 72.3 },
          { x: 166.4, y: 55 },
          { x: 160, y: 55.9 },
          { x: 152.4, y: 60.4 },
          { x: 170.2, y: 69.1 },
          { x: 162.6, y: 84.5 },
          { x: 170.2, y: 55.9 },
          { x: 158.8, y: 55.5 },
          { x: 172.7, y: 69.5 },
          { x: 167.6, y: 76.4 },
          { x: 162.6, y: 61.4 },
          { x: 167.6, y: 65.9 },
          { x: 156.2, y: 58.6 },
          { x: 175.2, y: 66.8 },
          { x: 172.1, y: 56.6 },
          { x: 162.6, y: 58.6 },
          { x: 160, y: 55.9 },
          { x: 165.1, y: 59.1 },
          { x: 182.9, y: 81.8 },
          { x: 166.4, y: 70.7 },
          { x: 165.1, y: 56.8 },
          { x: 177.8, y: 60 },
          { x: 165.1, y: 58.2 },
          { x: 175.3, y: 72.7 },
          { x: 154.9, y: 54.1 },
          { x: 158.8, y: 49.1 },
          { x: 172.7, y: 75.9 },
          { x: 168.9, y: 55 },
          { x: 161.3, y: 57.3 },
          { x: 167.6, y: 55 },
          { x: 165.1, y: 65.5 },
          { x: 175.3, y: 65.5 },
          { x: 157.5, y: 48.6 },
          { x: 163.8, y: 58.6 },
          { x: 167.6, y: 63.6 },
          { x: 165.1, y: 55.2 },
          { x: 165.1, y: 62.7 },
          { x: 168.9, y: 56.6 },
          { x: 162.6, y: 53.9 },
          { x: 164.5, y: 63.2 },
          { x: 176.5, y: 73.6 },
          { x: 168.9, y: 62 },
          { x: 175.3, y: 63.6 },
          { x: 159.4, y: 53.2 },
          { x: 160, y: 53.4 },
          { x: 170.2, y: 55 },
          { x: 162.6, y: 70.5 },
          { x: 167.6, y: 54.5 },
          { x: 162.6, y: 54.5 },
          { x: 160.7, y: 55.9 },
          { x: 160, y: 59 },
          { x: 157.5, y: 63.6 },
          { x: 162.6, y: 54.5 },
          { x: 152.4, y: 47.3 },
          { x: 170.2, y: 67.7 },
          { x: 165.1, y: 80.9 },
          { x: 172.7, y: 70.5 },
          { x: 165.1, y: 60.9 },
          { x: 170.2, y: 63.6 },
          { x: 170.2, y: 54.5 },
          { x: 170.2, y: 59.1 },
          { x: 161.3, y: 70.5 },
          { x: 167.6, y: 52.7 },
          { x: 167.6, y: 62.7 },
          { x: 165.1, y: 86.3 },
          { x: 162.6, y: 66.4 },
          { x: 152.4, y: 67.3 },
          { x: 168.9, y: 63 },
          { x: 170.2, y: 73.6 },
          { x: 175.2, y: 62.3 },
          { x: 175.2, y: 57.7 },
          { x: 160, y: 55.4 },
          { x: 165.1, y: 104.1 },
          { x: 174, y: 55.5 },
          { x: 170.2, y: 77.3 },
          { x: 160, y: 80.5 },
          { x: 167.6, y: 64.5 },
          { x: 167.6, y: 72.3 },
          { x: 167.6, y: 61.4 },
          { x: 154.9, y: 58.2 },
          { x: 162.6, y: 81.8 },
          { x: 175.3, y: 63.6 },
          { x: 171.4, y: 53.4 },
          { x: 157.5, y: 54.5 },
          { x: 165.1, y: 53.6 },
          { x: 160, y: 60 },
          { x: 174, y: 73.6 },
          { x: 162.6, y: 61.4 },
          { x: 174, y: 55.5 },
          { x: 162.6, y: 63.6 },
          { x: 161.3, y: 60.9 },
          { x: 156.2, y: 60 },
          { x: 149.9, y: 46.8 },
          { x: 169.5, y: 57.3 },
          { x: 160, y: 64.1 },
          { x: 175.3, y: 63.6 },
          { x: 169.5, y: 67.3 },
          { x: 160, y: 75.5 },
          { x: 172.7, y: 68.2 },
          { x: 162.6, y: 61.4 },
          { x: 157.5, y: 76.8 },
          { x: 176.5, y: 71.8 },
          { x: 164.4, y: 55.5 },
          { x: 160.7, y: 48.6 },
          { x: 174, y: 66.4 },
          { x: 163.8, y: 67.3 },
        ],
      },
    ],
  }

  const options = {
    chart: {
      width: props.chartWidth,
      height: 380,
      title: "Height vs Weight",
    },
    yAxis: {
      title: "Weight (kg)",
    },
    xAxis: {
      title: "Height (cm)",
    },
    tooltip: {
      template: function (category, items) {
        return (
          '<div class="tui-chart-default-tooltip">' +
          '<div class="tui-chart-tooltip-head">' +
          items.legend +
          "</div>" +
          '<table class="tui-chart-tooltip-body">' +
          "<tr>" +
          "<td>Weight</td>" +
          '<td class="tui-chart-tooltip-value">' +
          items.x +
          "kg</td>" +
          "</tr>" +
          "<tr>" +
          "<td>Height</td>" +
          '<td class="tui-chart-tooltip-value">' +
          items.y +
          "cm</td>" +
          "</tr>" +
          "</table>" +
          "</div>"
        )
      },
    },
  }
  return (
    <React.Fragment>
      <ScatterChart data={data} options={options} />
    </React.Fragment>
  )
}
export default ScatterChartToast
