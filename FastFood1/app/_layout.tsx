import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

/*
{ page ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {objFood.map((el: any, i) => (
            <View key={i} style={styles.itemCard}>
              <Image
                source={require("@/assets/imgFood/burg2.png")}
                style={styles.itemImage}
              />
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{el.name}</Text>
                <Text style={styles.itemDesc}>
                  {el.description}
                </Text>
                <Text style={styles.itemPrice}>{`R$${el.price}`}</Text>

                <TouchableOpacity style={styles.selectButton} onPress={() => togglePage2(el)}>
                  <Text style={styles.selectButtonText}>Select</Text>
                </TouchableOpacity>

                <View style={styles.starRow}>
                  {[...Array(calcGrade(el.avgQtd)).keys()].map((_, s) => (
                    <Image
                      key={s}
                      source={require("@/assets/icons/star.png")}
                      style={styles.starIcon}
                    />
                  ))}
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.detailContainer}>
            <View style={styles.detailCard}>
              <Image
                style={styles.detailImage}
                source={require("@/assets/imgFood/burg2.png")}
              />
              <View style={styles.detailInfo}>
                <Text style={styles.detailTitle}>{selectFood.name}</Text>
                <Text style={styles.detailDesc}>
                  {selectFood.description}
                </Text>
                <Text style={styles.detailPrice}>{`R$ ${selectFood.price}`}</Text>

                <TouchableOpacity style={styles.buyButton} onPress={togglePage}>
                  <Text style={styles.buyButtonText}>Buy</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.additionalContainer}>
              {[...Array(3).keys()].map((_, i) => (
                <View style={styles.additionalItem} key={i}>
                  <Text style={styles.additionalText}>Combo {i + 1}</Text>
                  <Text style={styles.additionalPrice}>+ R$ 10,00</Text>
                </View>
              ))}
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{`R$ ${selectFood.price + 30}`}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Comments</Text>
              <TouchableOpacity style={styles.buyButton}>
                <Text style={styles.buyButtonText}>Comment</Text>
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContainer}>
              {
                selectFood.avgQtd.map((el: any, i) => (
                  <View key={i + "comment"} style={styles.itemCard}>
                    <View style={styles.itemInfo}>
                      <Text style={styles.itemDesc}>
                        {el.desc}
                      </Text>
                      <View style={styles.starRow}>
                        {[...Array(Math.ceil(el.grade / 2)).keys()].map((_, s) => (
                          <Image
                            key={s}
                            source={require("@/assets/icons/star.png")}
                            style={styles.starIcon}
                          />
                        ))}
                      </View>
                    </View>
                  </View>
                ))
              }
            </ScrollView>
          </View>
        </ScrollView>
      )}
 */