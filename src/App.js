import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import "fontsource-roboto";

import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";

export default class App extends Component {
  state = {
    data: {},
    country: "",
  };

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <Typography variant="h2" gutterBottom>
          COVID-19 Tracker
        </Typography>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}
