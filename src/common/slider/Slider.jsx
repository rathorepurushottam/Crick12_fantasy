import { Animated, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useEffect, useRef, useState} from 'react'
// import Swiper from 'react-native-swiper'
import FastImage from 'react-native-fast-image'
import { SliderData } from '../../DummyData';
const { width } = Dimensions.get('window');



const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  useEffect(() => {
    const autoplay = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= SliderData.length) {
        nextIndex = 0;
      }
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000); // 3 seconds interval

    return () => clearInterval(autoplay);
  }, [currentIndex]);

  const onViewRef = React.useRef(({ changed }) => {
    setCurrentIndex(changed[0].index);
  });

  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  const renderItem = ({ item }) => (
    <TouchableOpacity activeOpacity={0.8} style={{ width: width - 40, marginHorizontal: 20, borderRadius: 10, overflow: 'hidden' }}>
      <FastImage
        source={item.image}
        style={{ width: '100%', height: 60, borderRadius: 10 }}
        resizeMode='stretch'
      />
    </TouchableOpacity>
  );
  const Dots = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
        {SliderData.map((_, index) => {
          const isActive = index === currentIndex;
          return (
            <View
              key={index}
              style={{
                width: isActive ? 30 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: isActive ? '#DBA63D' : 'transparent',
                marginHorizontal: 3,
                transition: 'width 0.3s',
                borderWidth:1,
                borderColor:"#DBA63D"
              }}
            />
          );
        })}
      </View>
    );
  };
  return (
    <View>
    <FlatList
      data={SliderData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
      )}
      onViewableItemsChanged={onViewRef.current}
      viewabilityConfig={viewConfigRef.current}
      ref={flatListRef}
    />
    <Dots />
  </View>
  )
}

export default Slider

const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB'
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5'
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9'
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    }
})