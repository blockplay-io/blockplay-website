import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { chartOptions } from "../components/kohinoor/constants/const";

class Chart extends Component {
  _isMounted = false;
  state = {
    values: [],
    labels: [],
    redraw: false
  };
  componentDidMount(){
    this._isMounted = true;
    this.timerList();
  }
  componentWillUnmount(){
    this._isMounted = false;
    clearTimeout(this.timerList);
  }
  componentDidUpdate(prevProps) {
    if ((this.state.values !== this.props.chartValues) && this._isMounted) {
      this.setState({ values: this.props.chartValues, redraw: true });
    }
    if ((this.state.labels !== this.props.chartLabels)&& this._isMounted) {
      this.setState({ labels: this.props.chartLabels, redraw: true });
    }
  }
  timerList = () =>
    setTimeout(() => {
      this.setState({ redraw: false });
    }, 2000);

    

  render() {
    if (this.state.redraw){
      this.timerList();
    };
    const data = {
      labels: this.state.labels,
      datasets: [
        {
          fill: true,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 5,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.values
        }
      ]
    };
    
    return (
      <Line data={data} options={chartOptions} redraw={this.state.redraw} />
    );
  }
}

export default Chart;
