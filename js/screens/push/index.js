import React, {PropTypes} from 'react'
import { Text, View, Image } from 'react-native'
import { connect } from 'react-redux'

import Button from './button'

import { pushScreen, updateScreens, popScreen } from './actions/'
import style from './style'

class PushScreen extends React.Component {
  static navigationOptions = {
    title: 'Screen'
  }

  componentWillUnmount() {
    // This occurs when the back button is pushed
    this.props.popScreen()
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
    popScreen: () => dispatch(popScreen()),
    updateScreens: () => dispatch(updateScreens())
  }
}

const mapStateToProps = (state, props) => {
  let { navigation } = props
  let name = 0
  let { screens } = state.pushReducer
  if (navigation.state.params && navigation.state.params.name) {
    name = navigation.state.params.name
  }

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
