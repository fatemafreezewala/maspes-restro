import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import * as React from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Container from '../../components/Container';
import SubContainer from '../../components/SubContainer';
import Header from '../../components/Header';
import colors from '../../utilities/colors';
import Fab from '../../components/Fab';
import fontFamily from '../../utilities/fontFamily';
import Pending from './Pending';
import Completed from './Completed';
import Accepted from './Accepted';

const Index = () => {
  const renderScene = SceneMap({
    first: Pending,
    second: Accepted,
    third: Completed,
  });
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Pending'},
    {key: 'second', title: 'Accepted'},
    {key: 'third', title: 'Completed'},
  ]);
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: colors.primary}}
      style={{backgroundColor: colors.white}}
      activeColor={colors.primary}
      inactiveColor={colors.iconinactive}
      labelStyle={{fontFamily: fontFamily.medium, textTransform: 'capitalize',fontSize:12}}
    />
  );
  return (
    <Container>
      <Header text="Orders" color={colors.white} />
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        swipeEnabled={true}
      />
    </Container>
  );
};

export default Index;

const styles = StyleSheet.create({});
