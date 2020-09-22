<template>
  <div>
    湖南顽主杯第38届-北京炒家(1419万)
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column align="center" type="index" width="50" label="序号"> </el-table-column>
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="todayMoney" label="今日资产(万)" width="180"> </el-table-column>
      <el-table-column prop="todayProfit" label="今日盈亏"> </el-table-column>
      <el-table-column prop="totalProfit" label="总盈亏"> </el-table-column>
      <el-table-column prop="shareholdingYesterdat" label="昨日持股"> </el-table-column>
      <el-table-column prop="shareholdingToday" label="今日持股"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2020/09/01',
          todayMoney: 1428,
          todayProfit: '--',
          totalProfit: '0.63%',
          shareholdingYesterdat: '--',
          shareholdingToday: '凌霄泵业178，航天发展178，沪硅产业252'
        },
        {
          date: '2020/09/02',
          todayMoney: 1422,
          todayProfit: '-0.42%',
          totalProfit: '0.21%',
          shareholdingYesterdat: '凌霄泵业178，航天发展178，沪硅产业252',
          shareholdingToday: '沪硅产业153，圣邦股份502'
        },
        {
          date: '2020/09/03',
          todayMoney: 1456,
          todayProfit: '2.39%',
          totalProfit: '2.61%',
          shareholdingYesterdat: '沪硅产业153，圣邦股份502',
          shareholdingToday: '金徽酒176，沪硅产业162，智飞生物393，圣邦股份398'
        },
        {
          date: '2020/09/04',
          todayMoney: 1473,
          todayProfit: '1.17%',
          totalProfit: '3.81%',
          shareholdingYesterdat: '金徽酒176，沪硅产业162，智飞生物393，圣邦股份398',
          shareholdingToday: '智飞生物149'
        },
        {
          date: '2020/09/07',
          todayMoney: 1474,
          todayProfit: '0.07%',
          totalProfit: '3.88%',
          shareholdingYesterdat: '智飞生物149',
          shareholdingToday: '上海发展184，上海物贸184，海天味业247'
        },
        {
          date: '2020/09/08',
          todayMoney: 1485,
          todayProfit: '0.75%',
          totalProfit: '4.65%',
          shareholdingYesterdat: '上实发展184，上海物贸184，海天味业247',
          shareholdingToday: '和邦生物163，首航高科185，山河智能185，森麒麟94，天山生物0.3'
        },
        {
          date: '2020/09/09',
          todayMoney: 1509.8,
          todayProfit: '1.67%',
          totalProfit: '6.4%',
          shareholdingYesterdat: '和邦生物163，首航高科185，山河智能185，森麒麟94，天山生物0.3',
          shareholdingToday: '海航控股188，中远海发188，太原重工144，阳光城188，天山生物1手'
        },
        {
          date: '2020/09/10',
          todayMoney: 1492,
          todayProfit: '-1.18%',
          totalProfit: '5.14%',
          shareholdingYesterdat: '海航控股188，中远海发188，太原重工144，阳光城188，天山生物1手',
          shareholdingToday: '太平洋173，温氏股份812'
        },
        {
          date: '2020/09/11',
          todayMoney: 1497,
          todayProfit: '0.34%',
          totalProfit: '5.5%',
          shareholdingYesterdat: '太平洋173，温氏股份812',
          shareholdingToday: '天顺风能187，温氏股份426，通威股份187，森麒麟1'
        },
        {
          date: '2020/09/14',
          todayMoney: 1506,
          todayProfit: '0.6%',
          totalProfit: '6.13%',
          shareholdingYesterdat: '天顺风能187，温氏股份426，通威股份187，森麒麟1',
          shareholdingToday: '科力远184，晶澳科技186，鹏鼎控股189，圣邦股份495'
        },
        {
          date: '2020/09/15',
          todayMoney: 1508,
          todayProfit: '0.13%',
          totalProfit: '6.27%',
          shareholdingYesterdat: '科力远184，金澳科技186，鹏鼎控股189，圣邦股份495',
          shareholdingToday: '杉杉股份187，集友股份188，圣邦股份182，比亚迪2'
        },
        {
          date: '2020/09/16',
          todayMoney: 1497,
          todayProfit: '-0.73%',
          totalProfit: '5.5%',
          shareholdingYesterdat: '杉杉股份187，集友股份188，圣邦股份182，比亚迪2',
          shareholdingToday: '同花顺604'
        },
        {
          date: '2020/09/17',
          todayMoney: 1491,
          todayProfit: '-0.4%',
          totalProfit: '5.07%',
          shareholdingYesterdat: '同花顺604',
          shareholdingToday: '华贸物流186，同花顺685'
        },
        {
          date: '2020/09/18',
          todayMoney: 1548,
          todayProfit: '3.82%',
          totalProfit: '9.09%',
          shareholdingYesterdat: '华贸物流186，同花顺685',
          shareholdingToday: '新力金融192，均胜电子187，新疆交建123，云南铜业93，同花顺379'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
