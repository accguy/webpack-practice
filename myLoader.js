// 로더를 통해 코드를 사전 처리할 수 있습니다.
// 예를 들어, 위의 코드에서는 커스텀 로더를 사용하여
// console.log를 confirm으로 변환했습니다.
// 이렇게 코드를 자동으로 변환할 수 있어 유지보수가 편리합니다.

// 로더가 읽을 파일이 item으로 전달됩니다.
// item은 리소스 파일의 콘텐츠를 담고 있는 문자열입니다.

module.exports = function myLoader(item) {
  // 반환하는 리소스를 replace 문법을 통해 가공합니다.
  const a = 12345;
  return item.replace("console.log(", `console.log(${a}+`);
};
