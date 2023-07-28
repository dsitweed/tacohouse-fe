import AudioCard from "@/components/common/AudioCard";
import sound1 from '@/assets/sound/Summertime.mp3';

export default function Dev() {
  
  return (
    <div>
      <AudioCard sounds={[sound1]}/>
    </div>
  );
}
