import stylesheet from '../style/print.scss';

export default function CSSPrint() {
  return (
    <style jsx global>
      {stylesheet}
    </style>
  );
}
