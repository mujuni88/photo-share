module.exports = {
  '**/*.ts?(x)': () => 'tsc -p ../../../../tsconfig.json --noEmit',
  '*.{js,jsx,ts,tsx,md,html,css}': 'prettier --write',
};
