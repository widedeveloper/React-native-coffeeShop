import React,{Component} from 'react';
import {Image,ScrollView, ImageBackground} from 'react-native';
import {Content, List, ListItem, Text, View, Container, Header, Title, Button, Left, Right, Body, Icon, H3} from "native-base";
import {Card, CardItem, Thumbnail} from 'native-base';
import {InfiniteListView} from '../../Components/InfiniteListView';

import {RefreshControl, Platform, Dimensions} from 'react-native';

import {connect} from 'react-redux';
import ShopActions from "../../Redux/ShopRedux";
import LinearGradient from 'react-native-linear-gradient';

import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import ImageLoad from '../../Components/ImageLoad/ImageLoad';

import { connectStyle } from 'native-base';

console.disableYellowBox = true;

class HomeScreen extends Component{
  state = {
    isRefreshing: this.props.shops.fetching,
    isLoadingMore: false,
    canLoadMoreContent: false,
    listItems: [],
  }

  componentDidMount () {
    this.props.refreshShopList()
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillMount() {
  }
    
  onRefresh = () => {
    this.props.refreshShopList()
  };

  onLoadMore = () => {
  };

  renderRow = (rowData, sectionID, rowID) => {
    let imageSrc = '';
    if(rowData.shopImage){
      imageSrc = rowData.shopImage;
      imageSrc = { uri: imageSrc };
    }
    else
      imageSrc = require('../../Resources/Images/background.png');
    return (
      <ListItem
        icon
        key={rowData.id}
        style={styles.listItem}
        //onPress={() => this.props.navigation.navigate("NavigationShopDetailTab")}
        onPress={() => this.props.gotoDetailShop(rowData.id)}
      >
        <Body>
          <ImageLoad 
            source={imageSrc}
            loadingStyle={{ size: 'small', color: 'grey' }}
            placeholderSource={require('../../Resources/Images/background.png')}
            placeholderStyle={styles.shopimage}
            style={{width: width,height: height/3}}
            imageStyle={{resizeMode: 'stretch'}}
          >
            <View style={styles.itembody}>
              {/* <View style={styles.carticon}>
                <Icon name="cart"/>
              </View> */}
              <View style={styles.shopinfo}>
                <Text style={styles.itemtext}>{rowData.name}</Text>
                <View style={styles.whiteborder}>
                </View>
                <View style={styles.locationinfo}>
                  <IconEvilIcons name='location' style={styles.locationicon} />
                  <Text style={styles.locationtxt}>{rowData.distance} miles</Text>
                </View>
              </View>
            </View>
          </ImageLoad>
        </Body>
        <Right style={styles.listitemicon}>
            <Icon name="arrow-forward" style={{color: 'white'}}/>
        </Right>
      </ListItem>
    );
  };
  
  render(){
    const {shops} = this.props.shops;
    const {fetching} = this.props.shops.fetching;
    return(
      <Container style={{backgroundColor:'#2e2d2e'}}>            
        <LinearGradient colors={['#2e2d2e','#434343','#4d4d4d']} style={styles.headerStyle}>
            <Left>
              <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                <Icon name="md-menu" style={{backgroundColor:'transparent', color:'white'}}/>
              </Button>
            </Left>            
            <View style={{flexDirection:'row', justifyContent:'flex-start', flexDirection:'row'}}>
              <Button transparent style={styles.btnmenu}>
                <Image source={require('../../Resources/Images/list.png')} style={styles.listicon}/>
              </Button>
              <Button transparent style={styles.btnmenu}>
                <Icon name='ios-search' style={styles.searchicon}/>
              </Button>
              <Button transparent style={styles.btnmenu}>
                <IconEvilIcons name='location' style={styles.locationicon} />
              </Button>
            </View>
        </LinearGradient>
        <Content style={styles.content} scrollEnabled={false}>
          <View style={styles.refreshview}><Image source={require('../../Resources/Images/refresh.png')} style={styles.refreshimage}/></View>
          <InfiniteListView
            style={styles.listview}
            dataArray={shops}
            renderRow={this.renderRow}
            onRefresh={this.onRefresh}
            isRefreshing={this.state.isRefreshing}
            canLoadMore={this.canLoadMoreContent}
            isLoadingMore={this.state.isLoadingMore}
            onLoadMore={this.onLoadMore}
          />
        </Content>
        <LinearGradient colors={['#2e2d2e00','#000000ff']} style={styles.bottomOverStyle}/>        
      </Container>
      )
  }
}
const mapStateToProps = state => {
  return {
    shops:state.shops
  };
};

const mapDispatchToProps = dispatch => {
  return {
    refreshShopList: () => dispatch(ShopActions.refreshRequest()),
    gotoDetailShop: (shopId) =>{ 
      dispatch(ShopActions.gotoDetailShop(shopId));
    },
  };
};

const {width, height} = Dimensions.get('window');
const toolBarHeight = (Platform.OS === "ios" ? 64 : 56)
const containerHeight = height-toolBarHeight;

const styles = {
  headerStyle:{
    height:toolBarHeight,
    paddingTop: Platform.OS === "ios" ? 15 : 0,
    flexDirection:'row',
    alignItems:'center'
  },
  contentContainer:{
    height:height
  },
  bottomOverStyle:{
    position:'absolute',    
    height:toolBarHeight,
    bottom:0,left:0,right:0,    
  },
  searchicon: {
    color: '#fff',
    fontSize: 25
  },
  locationicon: {
		color: '#fff',
		fontSize: 30
  },
  listicon: {
    width: 30,
    height: 30
  },
  btnmenu: {
    paddingHorizontal:2,
    paddingLeft: 5,
    paddingRight: 5
  },
  content: {
		backgroundColor: '#4d4d4d',
		flex: 1,
  },
  refreshview: {
		alignItems: 'center',
		position: 'absolute',
		top: 10,
		left: 0,
		right: 0,
		bottom: 0
	},
	refreshimage: {
		width: 46,
		height: 76
  },
  listview: {
    marginTop: 0,
    height: height
  },
  shopimage: {
    width: width,
    height: height/3,
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    resizeMode: 'stretch'
  },
  listItem: {
    height: height/3,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0
  },
  listitemicon: {
    height: height/3,
    borderColor: 'transparent',
    paddingLeft: 0,
    paddingRight: 10
  },
  carticon: {
    backgroundColor: 'yellow',
    borderRadius: 30,
    width: 50,
    height: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itembody: {
    height: height/3,
    width: width,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemtext: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    color: 'white'
  },
  whiteborder: {
    width: width*0.7,
    height: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ededed'
  },
  shopinfo: {
    marginTop: 10
  },
  locationinfo: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  locationicon: {
    color: '#fff',
    fontSize: 30
  },
  fillParent: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  locationtxt: {
    color: 'white'
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
/*refreshControl={ <RefreshControl/> }*/
