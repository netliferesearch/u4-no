export default function CSSPrint() {
  return (
    <style jsx global>
      {`
        @import '../style/print.scss';
      `}
    </style>
  );
}
