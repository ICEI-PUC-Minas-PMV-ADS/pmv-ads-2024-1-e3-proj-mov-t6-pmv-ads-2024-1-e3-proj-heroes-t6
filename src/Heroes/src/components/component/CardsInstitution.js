import {ScrollView} from 'react-native';
import ModalAboltInstituition from './AboltInstitution';


export default function CardInstitution() {

  const cards=[
    require('../../../assets/Image/bombeiros.png'),
    require('../../../assets/Image/eSolidar.png')
  ]

  return (
    <ScrollView>
        <ModalAboltInstituition imageCard={cards[0]} institution='Bombeiros'/>
        <ModalAboltInstituition imageCard={cards[1]} institution='eSolidar'/>
    </ScrollView>
  )
}
