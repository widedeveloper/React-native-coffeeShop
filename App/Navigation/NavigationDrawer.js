import React from "react";
import { DrawerNavigator } from "react-navigation";
import ListviewExample from "../Containers/ListviewExample";
import CardExample from "../Containers/CardExample";
import DrawerContent from "../Containers/DrawerContent";
import NavigationShopDetailTab from "./NavigationShopDetailTab";

import styles from "./Styles/NavigationStyles";
import HomeScreen from "../Containers/InDrawer/HomeScreen";
import NewShop from "../Containers/NewShop/NewShop";

const NavigationDrawer = DrawerNavigator({
		ListviewExample: { screen: ListviewExample },
		/*CardExample: { screen: CardExample },*/
		Home: { screen: HomeScreen },
		NavigationShopDetailTab: { screen: NavigationShopDetailTab },
		NewShop: {screen: NewShop}
		/*Profile: { screen: ProfileScreen },
		OrderHistory:{screen:OrderHistoryScreen},
		Wallet:{screen:WalletScreen},
		AddNewShop:{Screen: AddNewShopScreen},
		HelpCenter:{Screen: HelpCenter}
		FAQ:{Screen: FAQScreen}*/
	},
	{
		initialRouteName: "Home",
		contentComponent: props => <DrawerContent {...props} />,
		drawerBackgroundColor:'transparent'
	}
);

export default NavigationDrawer;
