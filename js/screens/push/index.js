import React, {PropTypes} from 'react'
import { Text, View, Image } from 'react-native'
import { connect } from 'react-redux'

import Button from './button'

import { pushScreen, updateScreens } from './actions/'
import style from './style'

class PushScreen extends React.Component {
  static navigationOptions = {
    title: 'Screen'
  }
  render() {
    let { name, colors, navigation, pushScreen, updateScreens, image } = this.props
    let uri = image.big
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
        <Image style={style.imageContainer} source={{uri:uri}} />
        <Button text={'Push New Screen'}
          action={() => {
            pushScreen()
            navigation.navigate('PushScreen', {name: name+1})
          }}/>
        <Button text={'Update All Screens'}
          action={updateScreens}/>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    pushScreen: () => dispatch(pushScreen()),
    updateScreens: () => dispatch(updateScreens())
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
    colors: screen.colors,
    image: screen.image
  }
}

const reduxContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PushScreen)

export default reduxContainer
