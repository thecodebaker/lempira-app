import moment from 'moment';
import 'moment/locale/es';
import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Text, Icon } from 'react-native-elements';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import Account from '../Types/Account';
import User from '../Types/User';
import { getAccountTotalStats } from '../redux/thunks/accounts';

type propType = {
  route: {
    params: { account: Account };
  };
  navigation: {
    navigate: Function;
  };
};
const AccountInfo = ({ route }: propType) => {
  moment.locale('es');
  const { account } = route.params;
  const dispatch = useDispatch();
  const [labels, setLabels] = useState<string[]>(['']);
  const [incomeData, setIncomeData] = useState<number[]>([0]);
  const [outcomeData, setOutcomeData] = useState<number[]>([0]);
  const signs: any = useSelector((state: RootStateOrAny) => state.common.signs);
  const user: User = useSelector((state: RootStateOrAny) => state.auth.user);

  useEffect(() => {
    dispatch(
      getAccountTotalStats(
        user.token,
        account.accountId,
        setLabels,
        setOutcomeData,
        setIncomeData
      )
    );
  }, []);

  const chartConfig = {
    backgroundColor: '#37B94A',
    backgroundGradientFrom: '#37B94A',
    backgroundGradientTo: '#3bd471',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForVerticalLabels: {
      fontWeight: 'bold',
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#FFF',
    },
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.chartContainer}>
        <Text h3 style={styles.title}>
          Total de Entrada
        </Text>
        {labels.length !== 0 && incomeData.length !== 0 ? (
          <>
            <LineChart
              data={{
                labels,
                datasets: [
                  {
                    data: incomeData,
                  },
                ],
              }}
              width={Dimensions.get('window').width * 0.9}
              height={Dimensions.get('window').height * 0.25}
              yAxisLabel={`${signs[account.currency]} `}
              yAxisInterval={100}
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 8,
                alignItems: 'center',
                borderRadius: 16,
              }}
            />
          </>
        ) : (
          <View style={styles.noDataContainer}>
            <View style={{ flex: 1 }}>
              <Icon
                size={32}
                type="material-community"
                name="emoticon-sad-outline"
              />
            </View>
            <View style={{ flex: 3 }}>
              <Text h4>No hay suficientes datos para mostrar esta grafica</Text>
            </View>
          </View>
        )}
      </View>
      <View style={styles.chartContainer}>
        <Text h3 style={styles.title}>
          Total de Salida
        </Text>
        {labels.length !== 0 && outcomeData.length !== 0 ? (
          <>
            <LineChart
              data={{
                labels,
                datasets: [
                  {
                    data: outcomeData,
                  },
                ],
              }}
              width={Dimensions.get('window').width * 0.9}
              height={Dimensions.get('window').height * 0.25}
              yAxisLabel={`${signs[account.currency]} `}
              yAxisInterval={100}
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 8,
                alignItems: 'center',
                borderRadius: 16,
              }}
            />
          </>
        ) : (
          <View style={styles.noDataContainer}>
            <View style={{ flex: 1 }}>
              <Icon
                size={32}
                type="material-community"
                name="emoticon-sad-outline"
              />
            </View>
            <View style={{ flex: 3 }}>
              <Text h4>No hay suficientes datos para mostrar esta grafica</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  title: {
    width: Dimensions.get('window').width * 0.9,
  },
  chartContainer: { alignItems: 'center' },
  noDataContainer: {
    height: Dimensions.get('window').height * 0.25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AccountInfo;
