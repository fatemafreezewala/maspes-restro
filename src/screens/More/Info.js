import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Container from '../../components/Container';
import SubContainer from '../../components/SubContainer';
import Header from '../../components/Header';
import {useWindowDimensions} from 'react-native';
import RenderHtml from 'react-native-render-html';

const Info = ({route, navigation}) => {
  const {title} = route.params;
  const {width} = useWindowDimensions();
  const source = {
    html: `
  <p style='text-align:center;'>
    Hello World!
  </p>`,
  };
  return (
    <Container>
      <Header showBack color="#fff" text={title}></Header>
      <SubContainer>
        <RenderHtml contentWidth={width} source={source} />
      </SubContainer>
    </Container>
  );
};

export default Info;

const styles = StyleSheet.create({});
