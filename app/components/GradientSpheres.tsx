const GradientSpheres = ({
  sphere1Class,
  sphere2Class,
}: {
  sphere1Class: any;
  sphere2Class: any;
}) => {
  return (
    <>
      <div className={sphere1Class}></div>
      <div className={sphere2Class}></div>
    </>
  );
};

export default GradientSpheres;
