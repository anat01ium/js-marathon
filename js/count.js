function countAttack({ name, maxCount }) {
   return ($button) => {
      --maxCount;
      $button.innerText = `${name} (${maxCount})`;
      
      if (maxCount === 0) { $button.disabled = true; }
   }
}

export default countAttack;
