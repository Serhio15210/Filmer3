import {View} from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { MAIN_GREY_SKELETON, WHITE } from "../../constants/colors";
import { normalize } from "../../responsive/fontSize";

const RowSkeleton = ({enabled}) => {
  return (
    <SkeletonPlaceholder borderRadius={4} enabled={enabled} backgroundColor={MAIN_GREY_SKELETON} highlightColor={WHITE}>

        <SkeletonPlaceholder.Item  gap={10} width={'100%'} flexDirection={'row'}  >
          <SkeletonPlaceholder.Item width={normalize(70)} height={normalize(105)}  />
          <SkeletonPlaceholder.Item  gap={10} width={'100%'}>
            <SkeletonPlaceholder.Item width={'100%'} height={normalize(40)}  />
            <SkeletonPlaceholder.Item >
              <SkeletonPlaceholder.Item width={normalize(150)} height={20} />
              <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} />
            </SkeletonPlaceholder.Item>

          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
 );
};

export default RowSkeleton;
