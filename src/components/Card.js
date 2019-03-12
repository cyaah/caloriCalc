import React, { Component } from "react";
import PropTypes from "prop-types";
import { NUTRIENT_ENDPOINT } from "../usdaAPI";
import { handleMissingValue } from "../utils";

class Card extends Component {
  state = {
    uniqueId: "",
    foodName: "",
    weight: undefined,
    measure: "",
    kcalValue: undefined,
    fetchApiCardIsLoaded: false,
    fetchApiCardErr: undefined
  };

  componentDidMount() {
    fetch(NUTRIENT_ENDPOINT(this.props.ndbno))
      .then(res => res.json())
      .then(data => {
        const kcalValue = (
          +handleMissingValue(data.report.foods[0].nutrients[0].gm) * 4 +
          +handleMissingValue(data.report.foods[0].nutrients[1].gm) * 9 +
          +handleMissingValue(data.report.foods[0].nutrients[2].gm) * 4
        ).toFixed(2);

        this.setState({
          uniqueId: data.report.foods[0].ndbno,
          foodName: data.report.foods[0].name,
          weight: data.report.foods[0].weight,
          measure: data.report.foods[0].measure,
          kcalValue,
          fetchApiCardIsLoaded: true
        });

        if (!this.state.fetchApiCardErr) {
          this.passKcalValue(kcalValue, data.report.foods[0].ndbno);
        }
      })
      .catch(err =>
        this.setState({
          fetchApiCardErr: err.message
        })
      );
  }

  passKcalValue = (kcal, ndbno) => this.props.trackKcalValue(kcal, ndbno);

  render() {
    const {
      uniqueId,
      foodName,
      weight,
      measure,
      kcalValue,
      fetchApiCardErr
    } = this.state;

    if (fetchApiCardErr) {
      return (
        <div className="food-card">
          <p className="error">{fetchApiCardErr}</p>
        </div>
      );
    } else {
      return (
        <div className="food-card">
          <p>Unique ID: {uniqueId}</p>
          <p>Food name: {foodName}</p>
          <p>weight: {weight}</p>
          <p>measure: {measure}</p>
          <p>Calories: {kcalValue} cal</p>
        </div>
      );
    }
  }
}

Card.propTypes = {
  ndbno: PropTypes.string.isRequired,
  trackKcalValue: PropTypes.func.isRequired
};

export default Card;
