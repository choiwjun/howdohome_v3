export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <div className="absolute bg-[#f9f5ec] h-[348px] left-[calc(8.33%+68px)] rounded-[20px] top-[92px] w-[1065px]">
        <div aria-hidden="true" className="absolute border border-[#e9decd] border-solid inset-0 pointer-events-none rounded-[20px]" />
      </div>
      <p className="absolute font-['Pretendard_Variable:Regular',sans-serif] font-normal leading-[normal] left-[calc(8.33%+92px)] text-[12px] text-black top-[171px] tracking-[-0.06px] w-[257px]">HOWDOHOME TV</p>
      <p className="absolute font-['Pretendard_Variable:Bold',sans-serif] font-bold leading-[normal] left-[calc(8.33%+92px)] text-[24px] text-black text-nowrap top-[205px] tracking-[-0.12px] whitespace-pre">영상으로 만나는 하우두홈</p>
      <p className="absolute font-['Pretendard_Variable:Regular',sans-serif] font-normal leading-[normal] left-[calc(8.33%+92px)] text-[15px] text-black top-[254px] tracking-[-0.075px] w-[401px]">
        하우두홈이 완성한 주택 이야기부터 집짓기 노하우까지,
        <br aria-hidden="true" />
        하우두홈TV에서 영상으로 만나보세요.
      </p>
      <div className="absolute bg-white h-[40px] left-[calc(8.33%+92px)] rounded-[20px] top-[320px] w-[172px]">
        <div aria-hidden="true" className="absolute border border-[#a88f6f] border-solid inset-0 pointer-events-none rounded-[20px]" />
      </div>
      <p className="absolute font-['Pretendard_Variable:Bold',sans-serif] font-bold leading-[normal] left-[calc(8.33%+178px)] text-[#a88f6f] text-[16px] text-center text-nowrap top-[331px] translate-x-[-50%] whitespace-pre">유튜브 채널 보러가기</p>
      <div className="absolute bg-[#d9d9d9] h-[300px] left-[calc(41.67%+95px)] rounded-[20px] top-[116px] w-[534px]" />
    </div>
  );
}