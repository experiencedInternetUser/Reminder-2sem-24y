import React, { Component } from "react";
import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";

class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: undefined,
      selected: undefined,
    };
  }

  addItemToCurrentDate = () => {
    const { selected, items } = this.state;
    if (selected && items && items[selected]) {
      const newItem = {
        name: "New Item",
        height: 50,
        day: selected,
      };
      items[selected].push(newItem);
      this.setState({ items: { ...items } });
    }
  };

  componentDidMount() {
    const today = new Date();
    this.selectCurrentDate(today);
  }

  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems}
        selected={this.state.selected}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
        rowHasChanged={this.rowHasChanged}
        showClosingKnob={false}
        theme={
          {
            //calendarBackground: '#3E4556',
          }
        }
      />
    );
  }

  loadItems = (day) => {
    const items = {};
    const today = this.timeToString(day.timestamp);
    setTimeout(() => {
      this.setState({
        items: items,
      });
    }, 1000);
    items["2024-05-20"] = this.createItemsForDay();
    items["2024-05-21"] = this.createItemsForDay();
  };

  createItemsForDay = () => {
    return [
      {
        name: "Запись",
        height: 50,
      },
    ];
  };

  renderItem = (reservation, isFirst) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? "black" : "#43515c";

    return (
      <TouchableOpacity
        style={[styles.item, { height: reservation.height }]}
        onPress={() => Alert.alert(reservation.name)}
      >
        <Text style={{ fontSize, color }}>{reservation.name}</Text>
      </TouchableOpacity>
    );
  };

  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }

  selectCurrentDate(date) {
    const selectedDate = this.timeToString(date.getTime());
    this.setState({ selected: selectedDate });
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#3E4556",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});

export default AgendaScreen;
