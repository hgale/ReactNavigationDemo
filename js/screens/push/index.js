import React, {PropTypes} from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

import Button from './button'

import { pushScreen, updateScreen } from './actions/'
import style from './style'

class PushScreen extends React.Component {
  static navigationOptions = {
    title: 'Screen'
  }
  render() {
    let { name, colors, navigation, pushScreen } = this.props
    let colorViews = []
    colors.map((color, index) => {
      colorViews.push(<View key={index} style={[style.colorView, {backgroundColor: color}]} />)
    })
    return  (
      <View style={style.container}>
        <Text style={style.name}>Screen: {name}</Text>
        <View style={style.colors}>
          {colorViews}
        </View>
        <Button text={'Push'}
          action={() => {
            pushScreen()
            navigation.navigate('PushScreen', {name: name+1})
          }}/>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    pushScreen: () => dispatch(pushScreen())
  }
}

const mapStateToProps = (state, props) => {
  console.log('The current state of the app is');
  console.log(state);
  console.log('End state log');
  let { navigation } = props
  let name = 0
  let { screens } = state.pushReducer
  if (navigation.state.params && navigation.state.params.name) {
    console.log('INSIDE MAP The name of this screen is ', navigation.state.params.name);
    name = navigation.state.params.name
  }
  console.log('Name is ', name);
  console.log('Screens is ');
  console.log(screens);
  console.log('end');
  let screen = screens[name]
  return {
    name: name,
    colors: screen.colors
  }
}

const reduxContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PushScreen)

export default reduxContainer
