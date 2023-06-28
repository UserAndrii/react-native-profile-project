import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import {
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import { addComment } from '../redux/operations';
import CommentsPost from '../components/CommentsPost';
import { selectAvatar, selectPost } from '../redux/selectors';

export default function CommentsScreen({ route }) {
  const dispatch = useDispatch();
  const avatar = useSelector(selectAvatar);
  const comments = useSelector(selectPost(route.params.id));
  const [comment, setComment] = useState();

  const sendComment = () => {
    if (!comment) {
      Toast.show({
        type: 'error',
        text1: 'Oops, the comment cannot be empty 😔',
      });
      return;
    }

    const commentData = {
      id: route.params.id,
      text: comment,
      avatar: avatar,
      date: new Date().getTime(),
    };

    dispatch(addComment(commentData));
    setComment('');
  };

  return (
    <View style={styles.container}>
      <ScrollView nestedScrollEnabled>
        <ImageBackground
          style={styles.image}
          source={{
            uri: route.params.photoUri ? route.params.photoUri : null,
          }}
        />
        {comments &&
          comments.map(({ avatar, date, text }, index) => (
            <CommentsPost
              key={date}
              avatar={avatar}
              index={index}
              comment={text}
              date={date}
            ></CommentsPost>
          ))}
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
      >
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Коментувати..."
            name="comment"
            value={comment}
            onChangeText={setComment}
            // multiline={true}
            placeholderTextColor={'#BDBDBD'}
            textContentType="name"
          />
          <View style={styles.icon}>
            <AntDesign
              name="arrowup"
              size={24}
              color="#FFFFFF"
              onPress={sendComment}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    zIndex: 10,
  },

  image: {
    backgroundColor: '#F6F6F6',
    height: 240,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 34,
  },

  inputWrapper: {
    position: 'relative',
    marginTop: 30,
  },

  input: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 19,
    height: 50,
    justifyContent: 'flex-end',
    paddingRight: 50,

    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 16,
  },

  icon: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    right: 8,
    top: 8,
    width: 34,
    height: 34,
    backgroundColor: '#FF6C00',
    borderRadius: 25,
  },
});
