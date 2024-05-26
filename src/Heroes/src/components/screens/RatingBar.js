import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function RatingBar({ defaultRating, setDefaultRating, maxRating }) {
    return (
        <View style={styles.ratingBarStyle}>
            {maxRating.map((item, key) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => setDefaultRating(item)}
                >
                  <Image
                    style={styles.starImageStyle}
                    source={
                      item <= defaultRating
                        ? require('../../../assets/Image/star_filled.jpg')
                        : require('../../../assets/Image/star_corner.jpg')
                    }
                  />
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    ratingBarStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
    },
    starImageStyle: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
    },
});
