const dataElement = document.getElementById("data");
const normalConsumerElement = document.getElementById("normal-consumer");
const upperCaseConsumerElement = document.getElementById("upper-case-consumer");
const delayedConsumerElement = document.getElementById("delayed-consumer");
const upperCaseAndDelayedConsumerElement = document.getElementById(
  "upper-case-and-delayed-consumer"
);
const normalConsumerOnlyWithDupaElement = document.getElementById(
  "normal-consumer-only-with-dupa"
);
const censoredConsumerOnlyWithDupaElement = document.getElementById(
  "censored-consumer-only-with-dupa"
);

// PROVIDER
const { fromEvent, operators } = rxjs;
const { delay, map, filter } = operators;
const keyup$ = fromEvent(dataElement, "keyup");
const normalStream$ = keyup$.pipe(map(() => dataElement.value));
const upperCaseStream$ = normalStream$.pipe(
  map((value) => value.toUpperCase())
);
const delayedStream$ = normalStream$.pipe(delay(1000));
const upperCaseAndDelayedStream$ = upperCaseStream$.pipe(delay(1000));

const normalStreamOnlyWithDupa$ = normalStream$.pipe(
  filter((value) => value.includes("dupa"))
);

const censoredStreamOnlyWithDupa$ = normalStreamOnlyWithDupa$.pipe(
  map((value) => value.replaceAll("dupa", "****"))
);

// CONSUMER
normalStream$.subscribe((value) => {
  normalConsumerElement.innerText = value;
});

upperCaseStream$.subscribe((value) => {
  upperCaseConsumerElement.innerText = value;
});

delayedStream$.subscribe((value) => {
  delayedConsumerElement.innerText = value;
});

upperCaseAndDelayedStream$.subscribe((value) => {
  upperCaseAndDelayedConsumerElement.innerText = value;
});

normalStreamOnlyWithDupa$.subscribe((value) => {
  normalConsumerOnlyWithDupaElement.innerText = value;
});

censoredStreamOnlyWithDupa$.subscribe((value) => {
  censoredConsumerOnlyWithDupaElement.innerText = value;
});
