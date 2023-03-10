import React, {useRef, useCallback, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Keyboard,
} from 'react-native';
import Header from '../../components/Header';
import colors from '../../utilities/colors';
import Container from '../../components/Container';
import SubContainer from '../../components/SubContainer';
import {api} from '../../constant/api';
import {
  actions,
  getContentCSS,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';
import Button from '../../components/Button';
import toast from '../../utilities/toast';
import {useUserStore} from '../../constant/store';

const initHTML = '';

const Editor = ({route, navigation}) => {
  const {title, type} = route.params; //type 1-about, 2-privacy, 3-terms
  const [user] = useUserStore(s => [s.user]);
  let [emojiVisible, setEmojiVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({});
  let scrollRef = useRef();
  let richText = useRef();
  let contentRef = useRef();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/restro/1');
      setLoading(false);
      if (res.status === 200) {
        if (res.data.status === 'success') {
          setDetails(res.data.data);
          console.log(res.data.data);
          if (type === 1) {
            richText.current?.insertHTML(res.data?.data?.restro_about || '');
          } else if (type === 2) {
            richText.current?.insertHTML(res.data?.data?.restro_privacy || '');
          } else if (type === 3) {
            richText.current?.insertHTML(res.data?.data?.restro_terms || '');
          }
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const saveDataToAPI = async () => {
    console.log(contentRef.current);
    if (details.restro_name === undefined) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append('restro_name', details.restro_name);
      formData.append('restro_phone', details.restro_phone);
      formData.append('restro_address', details.restro_address);
      formData.append('restro_desp', details.restro_desp);
      formData.append('restro_time', details.restro_time);
      formData.append('restro_banner', details.restro_banner);
      formData.append(
        'restro_about',
        type === 1 ? contentRef.current : details.restro_about,
      );
      formData.append(
        'restro_privacy',
        type === 2 ? contentRef.current : details.restro_privacy,
      );
      formData.append(
        'restro_terms',
        type === 3 ? contentRef.current : details.restro_terms,
      );
      setLoading(true);
      const res = await api.put('/restro/' + user.admin_restro_id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      if (res.data.status === 'success') {
        toast('Details Updated Successfully');
        navigation.goBack();
      } else {
        toast(res.data.message);
      }
    } catch (error) {
      setLoading(false);
     console.log(error);
    }
  };

  let handleChange = useCallback(html => {
    // save html to content ref;
    contentRef.current = html;
  }, []);

  // let onKeyHide = useCallback(() => {}, []);

  // let onKeyShow = useCallback(() => {
  //   TextInput.State.currentlyFocusedInput() && setEmojiVisible(false);
  // }, []);

  // editor height change
  // let handleHeightChange = useCallback(height => {
  //   console.log('editor height change:', height);
  // }, []);

  // let handleInsertHTML = useCallback(() => {
  //   // this.richText.current?.insertHTML(
  //   //     `<span onclick="alert(2)" style="color: blue; padding:0 10px;" contenteditable="false">HTML</span>`,
  //   // );
  //   richText.current?.insertHTML(initHTML);
  // }, []);

  let handleInput = useCallback(({data, inputType}) => {}, []);

  let handleMessage = useCallback(({type, id, data}) => {
    console.log('onMessage', type, id, data);
  }, []);

  let handleFocus = useCallback(() => {
    console.log('editor focus');
  }, []);

  let handleBlur = useCallback(() => {
    console.log('editor blur');
  }, []);

  let handleCursorPosition = useCallback(scrollY => {
    // Positioning scroll bar
    scrollRef.current.scrollTo({y: scrollY - 30, animated: true});
  }, []);

  return (
    <Container>
      <Header text={title} color={colors.white} />
      <SubContainer>
        <RichToolbar
          style={[styles.richBar, false && styles.richBarDark]}
          flatContainerStyle={styles.flatStyle}
          editor={richText}
          selectedIconTint={'#2095F2'}
          disabledIconTint={'#bfbfbf'}
          onPressAddImage={console.log}
          onInsertLink={console.log}
        />
        <ScrollView
          style={[styles.scroll, false && styles.scrollDark]}
          // keyboardDismissMode={'none'}
          ref={scrollRef}
          nestedScrollEnabled={true}
          scrollEventThrottle={20}>
          <RichEditor
            ref={richText}
            style={styles.rich}
            useContainer={true}
            initialHeight={400}
            // enterKeyHint={''}
            // containerStyle={{borderRadius: 24}}
            placeholder={'please input content'}
            // initialContentHTML={initHTML}
            editorInitializedCallback={() =>
              console.log('editorInitializedCallback')
            }
            onChange={handleChange}
            // onHeightChange={handleHeightChange}
            // onPaste={handlePaste}
            // onKeyUp={handleKeyUp}
            // onKeyDown={handleKeyDown}
            onInput={handleInput}
            onMessage={handleMessage}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onCursorPosition={handleCursorPosition}
            pasteAsPlainText={true}
          />
        </ScrollView>
        <Button text="SAVE" onPress={saveDataToAPI} />
      </SubContainer>
    </Container>
  );
};

export default Editor;

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  rich: {
    // minHeight: 300,
    flex: 1,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#e3e3e3',
    backgroundColor: '#f7f7f7',
  },
  topVi: {
    backgroundColor: '#fafafa',
  },
  richBar: {
    borderColor: '#efefef',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  richBarDark: {
    backgroundColor: '#191d20',
    borderColor: '#696969',
  },
  scroll: {
    backgroundColor: '#ffffff',
  },
  scrollDark: {
    backgroundColor: '#2e3847',
  },
  darkBack: {
    backgroundColor: '#191d20',
  },
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e8e8e8',
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  input: {
    flex: 1,
  },

  tib: {
    textAlign: 'center',
    color: '#515156',
  },

  flatStyle: {
    paddingHorizontal: 12,
  },
});
