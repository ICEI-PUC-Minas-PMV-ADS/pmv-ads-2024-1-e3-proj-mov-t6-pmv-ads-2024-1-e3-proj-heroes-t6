import {View,Modal, StyleSheet, TouchableOpacity,Text,SafeAreaView,Image, Button } from 'react-native'
import React, { useState } from 'react';
export default function RatingBar(){
    const [defaultRating, setDefaultRating] = useState(2);
const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
    return (
              <View style={styles.ratingBarStyle}>
                {maxRating.map((item, key) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={item}
                      onPress={() => setDefaultRating(item)}>
                      <Image
                        style={styles.starImageStyle}
                        source={
                          item <= defaultRating
                            ? require('../../../assets/Image/star_filled.png')
                            : require('../../../assets/Image/star_corner.png')
                        }
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          };
          const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: 'white',
                padding: 10,
                justifyContent: 'center',
                textAlign: 'center',
            },
            textStyle: {
                textAlign: 'center',
                fontSize: 23,
                color: '#000',
                marginTop: 15,
            },
            buttonStyle: {
                justifyContent: 'center',
                flexDirection: 'row',
                marginTop: 30,
                padding: 15,
                backgroundColor: '#8ad24e',
            },
            buttonTextStyle: {
                color: '#fff',
                textAlign: 'center',
            },
        });
    
    
