// @ts-ignore
import { BASE_URL } from '@env';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/es';
import React, { useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Text } from 'react-native-elements';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { getAccountTotalStats } from '../redux/thunks/accounts';

import Account from '../Types/Account';
import User from '../Types/User';

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
    <View>
      <Text h3>Total de Entrada</Text>
      <LineChart
        data={{
          labels,
          datasets: [
            {
              data: incomeData,
            },
          ],
        }}
        width={Dimensions.get('window').width}
        height={220}
        yAxisLabel={`${signs[account.currency]} `}
        yAxisInterval={100}
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <Text h3>Total de Salida</Text>
      <LineChart
        data={{
          labels,
          datasets: [
            {
              data: outcomeData,
            },
          ],
        }}
        width={Dimensions.get('window').width}
        height={220}
        yAxisLabel={`${signs[account.currency]} `}
        yAxisInterval={100}
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default AccountInfo;
