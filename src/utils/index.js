export const classNames = ({ className }) => {
  const elem = className.elem;
  const mods = Object.assign({}, className.mods);

  return `${elem} ${Object.entries(mods)
    .map(([key, value]) => [elem, key, value].join("_"))
    .join(" ")}`;
};
