import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { normalize } from "../../../responsive/fontSize";
import { Dimensions } from "react-native";
import { MAIN_GREY, MAIN_GREY_FADE, MAIN_GREY_SKELETON, WHITE } from "../../../constants/colors";


const HeaderFilmSkeleton = ({enabled}) => {
  return (
    <SkeletonPlaceholder borderRadius={4} enabled={enabled} backgroundColor={MAIN_GREY_SKELETON} highlightColor={WHITE}>
      <SkeletonPlaceholder.Item  padding={20} width={'100%'}>
      <SkeletonPlaceholder.Item  gap={10} flexDirection={'row'} justifyContent={'space-between'}>
      <SkeletonPlaceholder.Item  gap={10} width={'50%'}>
        <SkeletonPlaceholder.Item width={'100%'} height={normalize(50)}  />
        <SkeletonPlaceholder.Item >
          <SkeletonPlaceholder.Item width={normalize(150)} height={20} />
          <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginTop={10} width={50} height={20} />
      </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item  width={normalize(130)}
        height={normalize(190)}/>

      </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item  gap={10} marginTop={normalize(50)}>

          <SkeletonPlaceholder.Item width={'50%'} height={20} />
          <SkeletonPlaceholder.Item   width={'100%'} height={20} />
          <SkeletonPlaceholder.Item   width={'100%'} height={20} />

      </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginTop={normalize(50)} gap={10}>
          <SkeletonPlaceholder.Item width={'50%'} height={20} />
          <SkeletonPlaceholder.Item width={'50%'} height={20} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item width={'100%'} height={normalize(120)} marginTop={normalize(50)}/>
        <SkeletonPlaceholder.Item width={'100%'} height={normalize(120)} marginTop={normalize(50)}/>
        <SkeletonPlaceholder.Item width={'100%'} height={normalize(120)} marginTop={normalize(50)}/>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default HeaderFilmSkeleton;
