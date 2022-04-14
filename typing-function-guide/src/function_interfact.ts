/**
 * We can also declare functions using interfaces
 * Here we declare an attribute interface to pass into the functions
 */
 interface Attribute {
    age: number;
    sentence: string;
  }
  
  function personality_fn(attribute: Attribute): string {
    return `${attribute.sentence} ${attribute.age}`;
  }
  const personality_arror_fn = (attribute: Attribute): string => {
    return `${attribute.sentence} ${attribute.age}`;
  };