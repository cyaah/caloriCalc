import React, { Component } from "react";
import Spinner from "./Spinner";
import FoodsList from "./FoodsList";
import Card from "./Card";
import { SEARCH_ENDPOINT } from "../usdaAPI";
import { formatedFoodQuery, kCalSum } from "../utils";
import Background from "../edgar-castrejon-459807-unsplash.jpg";

var style = {
  backgroundImage: `url(${Background})`
};

class App extends Component {
  //The state in which we store the query, searchlist,
  state = {
    foodQuery: "",
    apiSearchList: [],
    apiSearchListIsLoaded: false,
    fetchApiSearchListErr: undefined,
    selectedFoods: [],
    kcalValues: []
  };

  //AJAX request for submitting search and returning list of search results(an array)
  handleSubmit = e => {
    e.preventDefault();
    fetch(SEARCH_ENDPOINT(this.state.foodQuery))
      .then(res => res.json())
      .then(listObj =>
        this.setState({
          apiSearchList: listObj.list.item,
          apiSearchListIsLoaded: true
        })
      )
      .catch(err =>
        this.setState({
          fetchApiSearchListErr: err.message
        })
      );
    // console.log(this.foodInput.value);
    this.foodInput.value = "";
  };

  //Setting query to state and formatting
  handleFoodQuery = e =>
    this.setState({
      foodQuery: formatedFoodQuery(e.target.value)
    });

  //setting selected foods to array  of selected foods
  handleSelectedFood = foodId => {
    if (foodId) {
      this.setState({
        selectedFoods: [
          ...this.state.selectedFoods,
          ...this.state.apiSearchList.filter(item => item.ndbno === foodId)
        ]
      });
    }
  };

  //Handling energy(kcal) or ndbno number
  handleKcalValue = (kcal, ndbno) => {
    this.setState({
      kcalValues: [
        ...this.state.kcalValues,
        { ndbno: ndbno || "", kcal: kcal || 0 }
      ]
    });
  };

  render() {
    const {
      foodQuery,
      apiSearchList,
      apiSearchListIsLoaded,
      selectedFoods,
      kcalValues
    } = this.state;
    return (
      <div style={style} className="app">
        <form className="search-food-form" onSubmit={this.handleSubmit}>
          <label htmlFor="foodInput">
            <input
              id="foodInput"
              className="food-input"
              type="text"
              ref={el => (this.foodInput = el)}
              onChange={e => this.handleFoodQuery(e)}
              autoFocus
            />
          </label>
          <button
            className="search-food-btn"
            type="submit"
            disabled={foodQuery === ""}
          >
            Search for food
          </button>
        </form>

        {apiSearchListIsLoaded ? (
          <FoodsList
            optionList={apiSearchList}
            trackFood={this.handleSelectedFood}
          />
        ) : (
          <Spinner />
        )}

        <div className="cards-container">
          {selectedFoods.length > 0 &&
            selectedFoods.map((card, index) => (
              <Card
                key={card.ndbno + index}
                ndbno={card.ndbno}
                trackKcalValue={this.handleKcalValue}
              />
            ))}
        </div>

        {kcalValues.length > 0 && (
          <div className="total-calories">
            <p>
              The sum calories of the selected foods is {kCalSum(kcalValues)}{" "}
              cal
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default App;
