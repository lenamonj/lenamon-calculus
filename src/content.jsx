// Lesson corpus and quiz bank, split out of App.jsx so content edits no longer
// churn the app engine. buildLessons receives the presentational components as
// arguments, so this module imports nothing from App.jsx (no circular import).
export function buildLessons({ M, Box, Graph, SlopeExplorer, SignChart, ParamExplorer, RiemannExplorer, Ref }) {
  return [
{slug:"functions",module:"Foundations",title:"Functions, Domain & Range",time:"10 min",content:[
{type:"concept",label:"A Function Is a Machine",render:()=>(
<div>
  <p>Let's start with the most important word in this whole course: <strong>function</strong>. Forget any scary definition you have heard. A function is just a <strong>machine for numbers</strong>.</p>
  <p>Here is the entire idea. You feed one number into the machine. The machine follows a fixed rule. Then one number comes back out.</p>
  <M d="x \;\longrightarrow\; \boxed{\;\text{the rule}\;} \;\longrightarrow\; f(x)" block/>
  <p>We write a function as <M d="f(x)"/>, and out loud we say "f of x." That notation looks fancy but it is only a label:</p>
  <p>The <M d="x"/> is the number you choose to put <strong>in</strong>.</p>
  <p>The <M d="f(x)"/> is the number that comes <strong>out</strong> after the rule runs.</p>
  <p>Let's actually run a machine. Suppose the rule inside is <M d="f(x)=2x+3"/>. In plain English that rule says: "take your number, double it, then add 3." Let's feed in <M d="x=4"/> and follow it one step at a time:</p>
  <Box>
    <p>Start with your input: <M d="4"/></p>
    <p>Double it: <M d="2 \times 4 = 8"/></p>
    <p>Add 3: <M d="8 + 3 = 11"/></p>
  </Box>
  <p>Written all on one line, that is:</p>
  <M d="f(4)=2(4)+3=8+3=11" block/>
  <p>You put <strong>4</strong> in, and <strong>11</strong> came out. Feed a different number in and you get a different number out. The machine just obeys its rule every single time.</p>
  <p>One quiet detail that matters later: a function gives back <strong>exactly one</strong> output for each input. Feed in 4 and you always get 11, never "11 or maybe 7." That dependability is the whole point of a function.</p>
</div>
)},
{type:"concept",label:"Plugging In Expressions, Not Just Numbers",render:()=>(
<div>
  <p>So far we fed the machine a number. You can also feed it a <em>letter</em> or a whole <em>expression</em>, and the rule does exactly the same thing: wherever the rule says <M d="x"/>, you write whatever you fed in. This small skill is the one that <Ref to="derivative"/> will lean on hardest, so let's get comfortable with it now, while the functions are simple.</p>
  <p>Take <M d="f(x)=2x+3"/> again. Feed in the letter <M d="a"/>: every <M d="x"/> becomes <M d="a"/>.</p>
  <M d="f(a)=2a+3" block/>
  <p>Now feed in the expression <M d="x+h"/> (two letters added together, just a name for "some number plus a little extra"). Every <M d="x"/> becomes <M d="(x+h)"/>, parentheses and all, so the doubling applies to the <em>whole</em> thing:</p>
  <M d="f(x+h)=2(x+h)+3=2x+2h+3" block/>
  <p>The parentheses matter. Doubling <M d="x+h"/> doubles both pieces, which is why the 2 reaches the <M d="h"/> as well.</p>
  <p>One more, with a square. Let <M d="g(x)=x^2"/>. Then <M d="g(x+h)=(x+h)^2"/>, which means <M d="(x+h)(x+h)"/>. Multiply every piece in the first bracket by every piece in the second:</p>
  <Box>
    <p><M d="x\cdot x=x^2"/></p>
    <p><M d="x\cdot h=xh"/></p>
    <p><M d="h\cdot x=hx"/>, the same as <M d="xh"/></p>
    <p><M d="h\cdot h=h^2"/></p>
  </Box>
  <M d="g(x+h)=x^2+2xh+h^2" block/>
  <p>The two middle pieces are each <M d="xh"/>, so together they make <M d="2xh"/>. A common slip is to write <M d="(x+h)^2=x^2+h^2"/>, forgetting the middle. Check with numbers: <M d="(1+2)^2=9"/>, but <M d="1^2+2^2=5"/>. The missing <M d="2xh=2(1)(2)=4"/> is exactly the difference.</p>
  <p>Finally, a note on letters. Nothing forces a function to be called <M d="f"/> or its input <M d="x"/>. In business we pick letters that remind us what they mean: <M d="C(x)"/> for the cost of making <M d="x"/> items, <M d="R(q)"/> for the revenue from selling <M d="q"/> units, <M d="V(t)"/> for the value of something at time <M d="t"/>. Read <M d="C(x)"/> as "cost at x." The machine works identically; only the labels change.</p>
</div>
)},
{type:"concept",label:"Domain and Range",render:()=>(
<div>
  <p>Now that a function is a machine, two natural questions come up. What are you <em>allowed</em> to feed in? And what can possibly come <em>out</em>? Each answer has a name, and that is all "domain" and "range" really are.</p>
  <Box>
    <p><strong>Domain</strong> = every number you are allowed to put <em>in</em>.</p>
    <p><strong>Range</strong> = every number that can come <em>out</em>.</p>
  </Box>
  <p>You will often hear these called the "set" of inputs or outputs. The word <strong>set</strong> is not special: it just means a group or collection of numbers. "The set of inputs" means "the group of numbers you are allowed to use." Nothing more.</p>
  <p>Here is the key fact. For most machines you are allowed to feed in <em>any</em> number you like, so the domain is simply "all numbers." But a few machines have a weak spot: certain inputs ask the machine to do something mathematically <strong>impossible</strong>. Sometimes that is only one or two numbers (such as a fraction's denominator (its bottom number) hitting zero); sometimes it is a whole range of numbers (such as every negative number under a square root). When it happens, the machine cannot produce an answer. We say it "jams," and we leave those inputs out of the domain.</p>
  <p>So finding a domain comes down to a single question:</p>
  <Box color="amber"><p><strong>Are there any inputs that would jam this machine? If so, every <em>other</em> number is allowed.</strong></p></Box>
  <p>The next section shows you the two ways a machine can jam with the functions you have right now, and explains exactly why each one happens.</p>
</div>
)},
{type:"rule",label:"The Two Jams to Hunt for First",render:()=>(
<div>
  <p>For every function built from adding, subtracting, multiplying, dividing, and square roots, only two situations make it impossible to compute. If neither one shows up, then every number is allowed and the domain is "all real numbers." (Later, in <Ref to="logarithms"/>, you will meet exactly one more kind of jam, when a new machine called the logarithm arrives. We will flag it loudly when it does.)</p>
  <p>Quick definition so nothing is assumed: <strong>real numbers</strong> are just the ordinary numbers you already use every day, the positives, the negatives, zero, fractions, and decimals. Picture every point on a number line. That is the real numbers.</p>

  <p style={{marginTop:14}}><strong>Jam #1: Dividing by zero.</strong></p>
  <p>If your function is a fraction, the bottom number (its name is the <strong>denominator</strong>) is never allowed to equal 0. Most courses just tell you "you can't divide by zero." Here is the actual reason:</p>
  <Box>
    <p>Division is really a question. The expression <M d="10 \div 2"/> asks: "how many 2's do I add together to reach 10?" The answer is 5, because <M d="2+2+2+2+2=10"/>.</p>
    <p>Now look at <M d="10 \div 0"/>. It asks: "how many 0's do I add together to reach 10?" But adding zero over and over only ever gives you 0. You can add zeros all day and never reach 10. There is simply <strong>no answer</strong>, so dividing by zero is called <strong>undefined</strong>. That is why a calculator shows ERROR.</p>
  </Box>

  <p style={{marginTop:14}}><strong>Jam #2: The square root of a negative number.</strong></p>
  <p>A square root is also a question. The symbol <M d="\sqrt{9}"/> asks: "what number, multiplied by itself, gives 9?" The answer is 3, because <M d="3 \times 3 = 9"/>.</p>
  <Box>
    <p>Now look at <M d="\sqrt{-4}"/>. It asks: "what number, multiplied by itself, gives <M d="-4"/>?"</p>
    <p>Try a positive number: <M d="2 \times 2 = 4"/>. That is positive.</p>
    <p>Try a negative number: <M d="(-2) \times (-2) = 4"/>. Still positive, because a negative times a negative makes a positive.</p>
    <p>No matter what real number you pick, squaring it never gives a negative result. So nothing works, and <M d="\sqrt{-4}"/> has no real answer.</p>
  </Box>
  <p>That is the complete list for now. To find a domain in this module, you only hunt for these two jams. No fraction? No square root? Then the domain is all real numbers.</p>
</div>
)},
{type:"example",label:"Full Walkthrough",render:()=>(
<div>
  <p>Let's find the domain of this function, thinking out loud the whole way:</p>
  <M d="f(x)=\dfrac{10}{x-3}" block/>
  <p><strong>Step 1: Which jam is even possible here?</strong> This function is a fraction, so Jam #1 (dividing by zero) is a risk. There is no square root anywhere, so Jam #2 cannot happen. We only have to worry about the denominator.</p>
  <p><strong>Step 2: Find the input that causes the jam.</strong> The denominator is <M d="x-3"/>. We ask when it equals zero, and solve that small equation:</p>
  <M d="x-3=0" block/>
  <p>To get <M d="x"/> by itself, add 3 to both sides:</p>
  <M d="x=3" block/>
  <p>So <M d="x=3"/> is the one forbidden input. If you plugged it in, the bottom would become <M d="3-3=0"/>, and the machine would jam.</p>
  <p><strong>Step 3: State the domain.</strong> Every real number is allowed except that single bad one:</p>
  <Box color="green"><p>Domain: all real numbers except <M d="x=3"/>.</p></Box>
  <p><strong>Step 4: Sanity check.</strong> A normal input should work, and the forbidden input should fail. Let's confirm both:</p>
  <p>Try <M d="x=0"/>: <M d="\dfrac{10}{0-3}=\dfrac{10}{-3}\approx -3.33"/>. Works fine.</p>
  <p>Try <M d="x=3"/>: <M d="\dfrac{10}{3-3}=\dfrac{10}{0}"/>. Undefined, it jams, exactly as we predicted.</p>
</div>
)},
{type:"practice",render:()=>(<span>Find the domain of <M d="f(x)=\dfrac{5}{x^2-4}"/></span>),
answer:()=>(
<div>
  <p>First, a quick word on that small raised 2. We read <M d="x^2"/> as "x squared," and it just means <M d="x"/> multiplied by itself: <M d="x\times x"/>. (Exponents get the full treatment in <Ref to="exponentials"/>; here you only need this one idea.) So <M d="x^2-4"/> means "(x times x) minus 4."</p>
  <p><strong>Step 1: Which jam is possible?</strong> This is a fraction, so the danger is Jam #1: the denominator <M d="x^2-4"/> hitting zero. No square root, so that is the only thing to check.</p>

  <p><strong>Step 2: Find the forbidden inputs.</strong> Set the denominator equal to zero and solve:</p>
  <M d="x^2-4=0" block/>
  <p>Add 4 to both sides to get the <M d="x^2"/> by itself:</p>
  <M d="x^2=4" block/>
  <p>Now we need every number whose square is 4. There are <strong>two</strong> of them, and here is why we cannot forget the negative one:</p>
  <Box>
    <p><M d="2 \times 2 = 4"/>, so <M d="x=2"/> works.</p>
    <p><M d="(-2) \times (-2) = 4"/>, so <M d="x=-2"/> works too (negative times negative is positive).</p>
  </Box>
  <p>So both <M d="x=2"/> and <M d="x=-2"/> make the bottom zero:</p>
  <M d="x=2\quad\text{or}\quad x=-2" block/>

  <p><strong>Step 3: State the domain.</strong> Every real number is allowed except those two:</p>
  <Box color="green">
    <p>Domain: all real numbers except <M d="x=2"/> and <M d="x=-2"/>.</p>
    <p>Quick checks:</p>
    <p><M d="x=0"/>: <M d="\dfrac{5}{0^2-4}=\dfrac{5}{0-4}=-\dfrac{5}{4}"/>. Works.</p>
    <p><M d="x=2"/>: <M d="\dfrac{5}{4-4}=\dfrac{5}{0}"/>. Jams, as predicted.</p>
  </Box>
</div>
)},
{type:"practice",render:()=>(<span>Let <M d="f(x)=x^2-3x"/>. Find <M d="f(2)"/>, <M d="f(-1)"/>, <M d="f(a)"/>, and <M d="f(x+h)"/>, simplifying each.</span>),
answer:()=>(
<div>
  <p>The rule is "square the input, then subtract three times the input." Apply it to each input in turn.</p>
  <p><strong><M d="f(2)"/>:</strong> <M d="2^2-3(2)=4-6=-2"/>.</p>
  <p><strong><M d="f(-1)"/>:</strong> careful with signs: <M d="(-1)^2=1"/> and <M d="-3(-1)=+3"/>, so <M d="f(-1)=1+3=4"/>.</p>
  <p><strong><M d="f(a)"/>:</strong> every <M d="x"/> becomes <M d="a"/>: <M d="f(a)=a^2-3a"/>. There is nothing to simplify; a letter stays a letter.</p>
  <p><strong><M d="f(x+h)"/>:</strong> every <M d="x"/> becomes <M d="(x+h)"/>:</p>
  <M d="f(x+h)=(x+h)^2-3(x+h)" block/>
  <p>Expand the square (from the lesson: <M d="(x+h)^2=x^2+2xh+h^2"/>) and distribute the <M d="-3"/> across both pieces:</p>
  <M d="f(x+h)=x^2+2xh+h^2-3x-3h" block/>
  <p>Quick check: set <M d="h=0"/> and it collapses to <M d="x^2-3x"/>, the original function, as it should.</p>
  <Box color="green"><p><M d="f(2)=-2"/>, <M d="f(-1)=4"/>, <M d="f(a)=a^2-3a"/>, <M d="f(x+h)=x^2+2xh+h^2-3x-3h"/>.</p></Box>
</div>
)},
]},

{slug:"lines",module:"Foundations",title:"Linear Equations & Slope",time:"10 min",content:[
{type:"concept",render:()=>(
<div>
  <p>Before we draw a single line, here is the playing field every graph lives on. Take two number lines and cross them. The flat one, running left to right, is the <strong>x-axis</strong>, and <M d="x"/> gets bigger as you move right. The standing-up one, running bottom to top, is the <strong>y-axis</strong>, and <M d="y"/> gets bigger as you move up. The spot where they cross is the <strong>origin</strong>. We name any location with a pair of numbers written <M d="(x,\,y)"/>: the first number is how far across, the second is how far up. So <M d="(0,\,1)"/> means "0 across, 1 up."</p>
  <p>A <strong>linear equation</strong> is an equation whose graph is a straight line. Every straight line you can walk along from left to right (that is, every line except a perfectly vertical one, which we will not need in this course) is described by:</p>
  <M d="y=mx+b" block/>
  <p>(When two letters are written side by side like <M d="mx"/>, that means multiply: <M d="mx"/> is <M d="m"/> times <M d="x"/>.)</p>
  <p>This has two pieces you need to understand:</p>

  <p><strong><M d="m"/> = the slope.</strong> Slope tells you how steep the line is. Think of it as: <em>"For every 1 step I take to the right, how many steps does the line go up (or down)?"</em></p>
  <p>If <M d="m=2"/>, the line goes up 2 for every 1 to the right: a steep uphill.</p>
  <p>If <M d="m=-3"/>, the line goes down 3 for every 1 to the right: a steep downhill.</p>
  <p>If <M d="m=0"/>, the line is flat: horizontal.</p>

  <p><strong><M d="b"/> = the y-intercept.</strong> This is where the line crosses the vertical (y) axis. Another way to think about it: <em>it's the starting value when <M d="x=0"/>.</em></p>

  <Graph fn={(x) => 2 * x + 1} xMin={-2} xMax={4} yMin={-2} yMax={9}
    highlights={[
      { x: 0, y: 1, label: "b = 1 (start here)", color: "#f59e0b", lo: [10, 16] },
      { x: 1, y: 3, label: "right 1, up 2", color: "#10b981", lo: [12, 10] },
      { x: 2, y: 5, label: "right 1, up 2 again", color: "#10b981", lo: [12, 10] },
    ]}
    label="y = 2x + 1"
    caption="Start at b=1 on the y-axis, then rise 2 for every 1 to the right"
  />
</div>
)},
{type:"rule",render:()=>(
<div>
  <p><strong>How to calculate slope when you have two points.</strong></p>
  <p>If you know two points on the line, call them <M d="(x_1,y_1)"/> and <M d="(x_2,y_2)"/>, the slope is:</p>
  <p>Those small numbers are just labels, not multiplication or powers. <M d="(x_1,y_1)"/> means "the x and y of the first point," and <M d="(x_2,y_2)"/> means "the x and y of the second point." That is all the little 1 and 2 are doing.</p>
  <M d="m=\dfrac{y_2-y_1}{x_2-x_1}=\dfrac{\text{how much y changed}}{\text{how much x changed}}=\dfrac{\text{rise}}{\text{run}}" block/>
  <p>Think of it like this: you're standing at point 1 and walking to point 2. The slope is how much you went up (rise) divided by how far you walked forward (run).</p>

  <p><strong>How to find <M d="b"/> after you know <M d="m"/>.</strong></p>
  <p>Take either point, plug the <M d="x"/>, <M d="y"/>, and <M d="m"/> into <M d="y=mx+b"/>, then solve for <M d="b"/>.</p>
  <p>Shortcut: if one of your points has <M d="x=0"/>, then <M d="y"/> at that point IS <M d="b"/> (because <M d="m\cdot 0+b=b"/>).</p>
  <p style={{marginTop:14}}><strong>Point-slope form: the fastest way to write a line from one point and a slope.</strong></p>
  <p>Suppose you know the slope <M d="m"/> and one point <M d="(x_1,y_1)"/>. Pick any other point <M d="(x,y)"/> on the line. The slope from the known point to it must be <M d="m"/>, so <M d="\tfrac{y-y_1}{x-x_1}=m"/>. Multiply both sides by <M d="x-x_1"/> and you get</p>
  <M d="y-y_1=m(x-x_1)" block/>
  <p>Example: slope 3 through <M d="(2,5)"/>: <M d="y-5=3(x-2)"/>, and multiplying out and adding 5 gives <M d="y=3x-1"/>. Check: at <M d="x=2"/>, <M d="y=6-1=5"/>. <Ref to="tangent-lines"/> uses this form on every problem, so it is worth knowing cold.</p>
</div>
)},
{type:"example",label:"How to Turn a Word Problem Into y = mx + b",render:()=>(
<div>
  <p><em>"A piece of equipment is worth $50,000 today and will be worth $10,000 in 10 years. It loses value in a straight line."</em></p>

  <p><strong>Step 1: Figure out what <M d="x"/> and <M d="y"/> represent.</strong></p>
  <p>The problem is about value changing over time. So:</p>
  <p>Let <M d="x"/> = time (in years), and let <M d="y"/> = value (in dollars).</p>

  <p><strong>Step 2: Pull out two data points from the words.</strong></p>
  <p>"Worth $50,000 <em>today</em>": today means <M d="x=0"/>, so the point is <M d="(0,\;50000)"/>.</p>
  <p>"Worth $10,000 <em>in 10 years</em>": that is <M d="x=10"/>, so the point is <M d="(10,\;10000)"/>.</p>

  <p><strong>Step 3: Calculate the slope.</strong></p>
  <M d="m=\frac{y_2-y_1}{x_2-x_1}=\frac{10000-50000}{10-0}=\frac{-40000}{10}=-4000" block/>
  <p>The slope is <strong>−4,000</strong>. The negative means the value is going <em>down</em>. It drops $4,000 every year.</p>

  <p><strong>Step 4: Find <M d="b"/>.</strong></p>
  <p>We got lucky: one of our points has <M d="x=0"/>. When <M d="x=0"/>, <M d="y=50000"/>. That means <M d="b=50000"/>.</p>

  <p><strong>Step 5: Write the final equation.</strong> One small bookkeeping move first: instead of the generic <M d="y"/> and <M d="x"/>, we will call the output <M d="V"/> (for value) and the input <M d="t"/> (for time), so the letters remind us what they stand for. It is the exact same <M d="y=mx+b"/> line, only with friendlier letters. Read <M d="V(t)"/> as "value at time <M d="t"/>."</p>
  <M d="\boxed{V(t)=-4000t+50000}" block/>

  <p><strong>Step 6: Always check your work.</strong> Plug in <M d="t=10"/>:</p>
  <M d="V(10)=-4000(10)+50000=-40000+50000=10000\;\checkmark" block/>

  <Graph fn={(x) => -4000 * x + 50000} xMin={-1} xMax={12} yMin={-5000} yMax={55000}
    highlights={[
      { x: 0, y: 50000, label: "Today: $50K", color: "#f59e0b", lo: [8, -10] },
      { x: 10, y: 10000, label: "Year 10: $10K", color: "#ef4444", lo: [8, -14] },
    ]}
    caption="The line slopes downward: value drops $4,000 per year"
  />
</div>
)},
{type:"interactive",render:()=>(<ParamExplorer xMin={-4} xMax={4} yMin={-6} yMax={8} min={-3} max={3} step={0.25} start={2} name="m" hint="steeper or flatter"
  intro="Slope is just steepness. Drag the slider and watch the line tilt, and notice the equation update in real time."
  build={(m)=>({curves:[{f:(x)=>m*x+1,color:"#818cf8"}],points:[{x:0,y:1,color:"#f59e0b",label:"b = 1",lx:-12,ly:-13,anchor:"end"}],formula:`y=${m.toFixed(2)}x+1`,caption: m>0.05?"Positive slope: the line climbs as you move right.": m<-0.05?"Negative slope: the line falls as you move right.":"Slope near zero: an almost flat, horizontal line."})}/>)},
{type:"practice",render:()=>(<span>A bond fund's NAV (net asset value, or price per share) was <strong>$25 at month 0</strong> and <strong>$27.50 at month 5</strong>. Assume straight-line growth. Write the equation in <M d="y=mx+b"/> form.</span>),
answer:()=>(
<div>
  <p><strong>Step 1: Decide what <M d="x"/> and <M d="y"/> mean.</strong></p>
  <p>Time is changing (months), and NAV is changing (dollars). So:</p>
  <p><M d="x"/> = months, <M d="y"/> = NAV in dollars</p>

  <p><strong>Step 2: Pull out the two points.</strong></p>
  <p>"$25 at month 0" gives the point <M d="(0,\;25)"/>.</p>
  <p>"$27.50 at month 5" gives the point <M d="(5,\;27.50)"/>.</p>

  <p><strong>Step 3: Calculate slope <M d="m"/>.</strong></p>
  <p>Slope = rise over run = how much <M d="y"/> changed ÷ how much <M d="x"/> changed:</p>
  <M d="m=\frac{27.50-25}{5-0}=\frac{2.50}{5}=0.50" block/>
  <p><strong>What does 0.50 mean?</strong> The NAV goes up $0.50 every month. That is what slope is: the rate of change per unit of <M d="x"/>.</p>

  <p><strong>Step 4: Find <M d="b"/>.</strong></p>
  <p>Again, we have a point where <M d="x=0"/>: at month 0, NAV = $25. So <M d="b=25"/>.</p>
  <p>(If we didn't have a point at <M d="x=0"/>, we'd plug a point into <M d="y=mx+b"/>: <M d="27.50=0.50(5)+b\;\Rightarrow\;b=25"/>.)</p>

  <p><strong>Step 5: Write the equation.</strong></p>
  <M d="\boxed{\text{NAV}(t)=0.50t+25}" block/>

  <p><strong>Step 6: Check it.</strong></p>
  <M d="\text{NAV}(5)=0.50(5)+25=2.50+25=27.50\;\checkmark" block/>

  <p><strong>Bonus, predicting the future:</strong> What is the NAV at month 12?</p>
  <M d="\text{NAV}(12)=0.50(12)+25=6+25=\$31" block/>

  <Graph fn={(x) => 0.5 * x + 25} xMin={-1} xMax={14} yMin={23} yMax={33}
    highlights={[
      { x: 0, y: 25, label: "(0, $25)", color: "#f59e0b", lo: [10, 16] },
      { x: 5, y: 27.5, label: "(5, $27.50)", color: "#f59e0b", lo: [10, -14] },
      { x: 12, y: 31, label: "Month 12: $31", color: "#10b981", lo: [-100, -14] },
    ]}
    caption="The line rises $0.50 per month. You can predict future values."
  />

  <Box color="green">
    <p><M d="\text{NAV}(t)=0.50t+25"/></p>
    <p><strong>Key takeaway:</strong> Every y=mx+b problem follows the same 5 steps: define variables, find points, calculate slope, find b, write the equation.</p>
  </Box>
</div>
)},
{type:"practice",render:()=>(<span>A courier charges <strong>$7</strong> for a 2-mile delivery and <strong>$15</strong> for a 6-mile delivery, and its pricing is a straight line. Find the price per mile and the base fee, and write the price as a function of miles.</span>),
answer:()=>(
<div>
  <p><strong>Step 1: Name the variables.</strong> <M d="x"/> = miles, <M d="y"/> = price in dollars. The two points are <M d="(2,\;7)"/> and <M d="(6,\;15)"/>.</p>
  <p><strong>Step 2: Slope.</strong></p>
  <M d="m=\frac{15-7}{6-2}=\frac{8}{4}=2" block/>
  <p>The price rises $2 for every extra mile, so the <strong>price per mile is $2</strong>.</p>
  <p><strong>Step 3: Point-slope form.</strong> Neither point has <M d="x=0"/>, so the shortcut for <M d="b"/> does not apply. Use point-slope with <M d="(2,7)"/>:</p>
  <M d="y-7=2(x-2)\;\Rightarrow\;y-7=2x-4\;\Rightarrow\;y=2x+3" block/>
  <p>The <M d="b"/> is 3: the <strong>base fee is $3</strong>, what you pay before the first mile. (Using the other point gives the same line: <M d="y-15=2(x-6)"/> becomes <M d="y=2x+3"/> too.)</p>
  <p><strong>Step 4: Check.</strong> <M d="x=6"/>: <M d="2(6)+3=15"/>. Correct.</p>
  <Box color="green"><p><M d="\text{Price}(x)=2x+3"/>: $2 per mile plus a $3 base fee.</p></Box>
</div>
)},
]},

{slug:"quadratics",module:"Foundations",title:"Quadratics, Polynomials & Solving Equations",time:"12 min",content:[
{type:"concept",label:"Why a Parabola Bends",render:()=>(
<div>
  <p>In <Ref to="lines"/> every graph was a straight line, because <M d="x"/> appeared only to the first power. This lesson is about what happens the moment an <M d="x^2"/> shows up. The graph stops being straight and starts to <strong>bend</strong>, and that bent shape, called a <strong>parabola</strong>, is the shape of nearly every revenue, cost, and profit curve in this course. Learn it once here and you will recognize it everywhere later.</p>
  <p>Start with the simplest case, <M d="y=x^2"/>, and compute some points. Remember from <Ref to="functions"/> that <M d="x^2"/> means <M d="x\times x"/>:</p>
  <Box>
    <p><M d="x=-3"/>: <M d="(-3)\times(-3)=9"/></p>
    <p><M d="x=-2"/>: <M d="(-2)\times(-2)=4"/></p>
    <p><M d="x=-1"/>: <M d="1"/></p>
    <p><M d="x=0"/>: <M d="0"/></p>
    <p><M d="x=1"/>: <M d="1"/></p>
    <p><M d="x=2"/>: <M d="4"/></p>
    <p><M d="x=3"/>: <M d="9"/></p>
  </Box>
  <p>Two things jump out. First, the outputs are never negative, because a number times itself is never negative (<Ref to="functions"/> showed why: a negative times a negative is positive). So the graph never dips below the axis, and it has a lowest point at <M d="(0,0)"/>. Second, the outputs are <strong>symmetric</strong>: <M d="x=3"/> and <M d="x=-3"/> both give 9. The left half of the graph is a mirror image of the right half. Plot the points, connect them, and you get a U shape.</p>
  <p>Now two easy variations. Put a minus sign in front, <M d="y=-x^2"/>, and every output flips sign, so the U flips upside down into a dome with a highest point instead of a lowest one. Multiply by a number, say <M d="y=0.5x^2"/>, and every output is halved, so the U opens wider. The number in front controls how tightly the curve bends, and its sign controls whether the curve holds water (opens up) or spills it (opens down).</p>
  <Graph fns={[(x)=>x*x,(x)=>-x*x,(x)=>0.5*x*x]} xMin={-3.5} xMax={3.5} yMin={-9} yMax={9}
    label={<><span style={{color:"#818cf8"}}>y = x²</span> <span style={{color:"#e2e8f0"}}>and</span> <span style={{color:"#f472b6"}}>y = -x²</span> <span style={{color:"#e2e8f0"}}>and</span> <span style={{color:"#34d399"}}>y = 0.5x²</span></>}
    caption="A positive coefficient opens the parabola upward; a negative one flips it into a dome; a smaller coefficient opens it wider."/>
  <p>Why does the curve get steeper as you move away from the middle? Because squaring grows faster than counting. Going from <M d="x=1"/> to <M d="x=2"/> lifts the output by 3 (from 1 to 4), but going from <M d="x=2"/> to <M d="x=3"/> lifts it by 5 (from 4 to 9). Each step to the right adds more than the step before. That accelerating climb is exactly what a bend looks like, and in <Ref to="derivative"/> you will measure it precisely.</p>
</div>
)},
{type:"concept",label:"The Vertex: Where the Curve Turns",render:()=>(
<div>
  <p>The general quadratic is written</p>
  <M d="y=ax^2+bx+c" block/>
  <p>with three numbers: <M d="a"/> (the coefficient on <M d="x^2"/>, which cannot be 0 or the <M d="x^2"/> would vanish), <M d="b"/> (the coefficient on <M d="x"/>), and <M d="c"/> (the constant). The <M d="bx"/> term slides the U sideways, so the turning point is no longer at <M d="x=0"/>. That turning point is called the <strong>vertex</strong>, and in business it is the point you care about most: the lowest cost, the highest revenue, the peak profit.</p>
  <p>Here is where the vertex sits:</p>
  <M d="x_{\text{vertex}}=-\frac{b}{2a}" block/>
  <p><strong>Why that formula?</strong> Use the symmetry you just saw. A parabola is a mirror image of itself around a vertical line through its vertex. So if the curve crosses the <M d="x"/>-axis at two points (its <strong>roots</strong>, the inputs that make <M d="y=0"/>), the vertex must sit exactly halfway between them. The next section shows that the two roots are always <M d="-\tfrac{b}{2a}"/> <em>plus</em> some amount and <M d="-\tfrac{b}{2a}"/> <em>minus</em> the same amount. Halfway between "a bit more" and "a bit less" is <M d="-\tfrac{b}{2a}"/> itself. (When there are no roots the mirror line is still there, and the formula still finds it.)</p>
  <p>Check it on <M d="y=x^2-6x+5"/>, where <M d="a=1"/>, <M d="b=-6"/>, <M d="c=5"/>. The formula says the vertex is at <M d="x=-\tfrac{-6}{2\cdot 1}=3"/>. Plug in: <M d="y=9-18+5=-4"/>. And the roots, found in the next section, turn out to be 1 and 5, whose midpoint is indeed 3.</p>
  <Graph fn={(x)=>x*x-6*x+5} xMin={-1} xMax={7} yMin={-5} yMax={7}
    highlights={[{x:1,y:0,label:"root x = 1",color:"#f59e0b",lo:[-44,-12]},{x:5,y:0,label:"root x = 5",color:"#f59e0b",lo:[8,-12]},{x:3,y:-4,label:"vertex (3, -4)",color:"#10b981",lo:[10,14]}]}
    caption="The vertex sits halfway between the two roots, on the parabola's mirror line x = 3."/>
</div>
)},
{type:"rule",label:"Factoring, the Zero-Product Rule, and the Quadratic Formula",render:()=>(
<div>
  <p>To find the roots you must solve <M d="ax^2+bx+c=0"/>. Unlike a line, you cannot just move things to the other side, because the <M d="x^2"/> and the <M d="x"/> are stuck together. There are two tools.</p>
  <p><strong>Tool 1: Factor, then use the zero-product rule.</strong> Factoring means rewriting a sum as a product (things multiplied together). Three patterns cover nearly every case you will meet:</p>
  <Box>
    <p><strong>Common factor.</strong> <M d="ax^2+bx=x(ax+b)"/>. Every term has an <M d="x"/> in it, so pull it out front. Example: <M d="3x^2-12x=3x(x-4)"/>.</p>
    <p><strong>Difference of squares.</strong> <M d="a^2-b^2=(a-b)(a+b)"/>. Check by multiplying back: <M d="(a-b)(a+b)=a^2+ab-ab-b^2=a^2-b^2"/>; the middle terms cancel. Example: <M d="x^2-9=(x-3)(x+3)"/>.</p>
    <p><strong>Simple trinomial.</strong> <M d="x^2+bx+c=(x+m)(x+n)"/> where the two numbers <M d="m"/> and <M d="n"/> <em>add</em> to <M d="b"/> and <em>multiply</em> to <M d="c"/>. Example: for <M d="x^2-6x+5"/> we need two numbers adding to <M d="-6"/> and multiplying to <M d="5"/>. They are <M d="-1"/> and <M d="-5"/>, so <M d="x^2-6x+5=(x-1)(x-5)"/>. Multiply back to check: <M d="x^2-5x-x+5=x^2-6x+5"/>.</p>
  </Box>
  <p>Once the left side is a product, the <strong>zero-product rule</strong> finishes the job: a product is zero only when at least one of its factors is zero, because two nonzero numbers can never multiply to 0. So <M d="(x-1)(x-5)=0"/> means <M d="x-1=0"/> or <M d="x-5=0"/>, giving <M d="x=1"/> or <M d="x=5"/>.</p>
  <p><strong>Tool 2: The quadratic formula.</strong> Some quadratics refuse to factor nicely. This formula solves <em>every</em> equation shaped like <M d="ax^2+bx+c=0"/>:</p>
  <M d="x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}" block/>
  <p>The <M d="\pm"/> sign means "do it twice, once with plus and once with minus," which is how one formula produces both roots. It comes from a technique called completing the square; we take it as a trusted tool here. Notice the <M d="-\tfrac{b}{2a}"/> hiding inside it: the formula is literally "the vertex, plus or minus the same distance," which is the symmetry argument from the last section.</p>
  <p>Two sign traps when <M d="b"/> is negative: the formula opens with <M d="-b"/>, so a negative <M d="b"/> becomes positive; and <M d="b^2"/> is always positive, because a negative squared is positive.</p>
  <p><strong>Vocabulary you will see from here on.</strong> A <strong>polynomial</strong> is any sum of whole-number powers of <M d="x"/> with number coefficients, such as <M d="3x^2+5x-1"/> or <M d="x^3-2x"/>. Its <strong>degree</strong> is the highest power present (2 and 3 for those two). Its <strong>leading coefficient</strong> is the number multiplying that highest power (3 and 1). A line is a polynomial of degree 1; a quadratic has degree 2. A <strong>rational function</strong> is one polynomial divided by another, like <M d="\tfrac{x+1}{x^2-4}"/>; its only jam is a zero denominator, exactly as in <Ref to="functions"/>.</p>
</div>
)},
{type:"example",label:"A Profit Parabola, Two Ways",render:()=>(
<div>
  <p>A small company's profit, in dollars, from selling <M d="x"/> units is</p>
  <M d="P(x)=-2x^2+120x-1000" block/>
  <p>Find the sales levels where profit is exactly zero, and the sales level that gives the most profit.</p>
  <p><strong>Step 1: Set profit to zero and simplify.</strong> Every term is divisible by <M d="-2"/>, so divide the whole equation by <M d="-2"/> to make the numbers friendlier (dividing both sides of an equation by the same nonzero number keeps it true):</p>
  <M d="-2x^2+120x-1000=0\;\Rightarrow\;x^2-60x+500=0" block/>
  <p><strong>Step 2: Factor.</strong> We need two numbers that add to <M d="-60"/> and multiply to <M d="500"/>. Try <M d="-10"/> and <M d="-50"/>: they add to <M d="-60"/> and multiply to <M d="500"/>. So:</p>
  <M d="(x-10)(x-50)=0" block/>
  <p><strong>Step 3: Zero-product rule.</strong> <M d="x=10"/> or <M d="x=50"/>. Profit is zero at 10 units and again at 50 units. Below 10 units the company loses money, between 10 and 50 it makes money, and above 50 it loses money again (it has to cut prices so far to sell that much). These zero-profit points are called <strong>break-even</strong> points, and <Ref to="business-models"/> is built around them.</p>
  <p><strong>Step 4: Find the vertex.</strong> With <M d="a=-2"/> and <M d="b=120"/>:</p>
  <M d="x_{\text{vertex}}=-\frac{120}{2(-2)}=-\frac{120}{-4}=30" block/>
  <p>Sanity check: 30 is halfway between the roots 10 and 50. Now the profit there:</p>
  <M d="P(30)=-2(900)+120(30)-1000=-1800+3600-1000=800" block/>
  <p>Because <M d="a=-2"/> is negative the parabola opens downward, so this vertex is the <em>top</em>: the most profit possible is <strong>$800</strong>, at 30 units.</p>
  <Graph fn={(x)=>-2*x*x+120*x-1000} xMin={0} xMax={60} yMin={-1100} yMax={1000}
    highlights={[{x:10,y:0,label:"break-even",color:"#f59e0b",lo:[-34,-12]},{x:50,y:0,label:"break-even",color:"#f59e0b",lo:[-34,-12]},{x:30,y:800,label:"peak: $800 at 30 units",color:"#10b981",lo:[-70,-14]}]}
    caption="Profit crosses zero at 10 and 50 units and peaks at the vertex, 30 units."/>
  <Box color="green"><p>Break-even at 10 and 50 units; maximum profit $800 at 30 units. In <Ref to="marginal"/> you will find that same kind of peak a completely different way, with a derivative, and the two methods will agree.</p></Box>
</div>
)},
{type:"example",label:"When It Will Not Factor",render:()=>(
<div>
  <p>Solve <M d="x^2+4x-3=0"/>.</p>
  <p><strong>Step 1: Try to factor.</strong> We need two numbers that add to 4 and multiply to <M d="-3"/>. The pairs that multiply to <M d="-3"/> are <M d="(1,-3)"/> and <M d="(-1,3)"/>, which add to <M d="-2"/> and <M d="2"/>. Neither is 4. It does not factor with whole numbers, so reach for the formula.</p>
  <p><strong>Step 2: Identify <M d="a"/>, <M d="b"/>, <M d="c"/>.</strong> <M d="a=1"/>, <M d="b=4"/>, <M d="c=-3"/>.</p>
  <p><strong>Step 3: Apply the formula.</strong> Watch the <M d="-4ac"/> piece: <M d="c"/> is negative, so <M d="-4(1)(-3)=+12"/>.</p>
  <M d="x=\frac{-4\pm\sqrt{16+12}}{2}=\frac{-4\pm\sqrt{28}}{2}" block/>
  <p><strong>Step 4: Evaluate.</strong> <M d="\sqrt{28}\approx 5.2915"/>, so the two roots are</p>
  <M d="x=\frac{-4+5.2915}{2}\approx 0.6458\qquad x=\frac{-4-5.2915}{2}\approx -4.6458" block/>
  <p>Check the first one: <M d="0.6458^2+4(0.6458)-3\approx 0.417+2.583-3=0"/>. It works.</p>
  <Box color="green"><p><M d="x\approx 0.646"/> or <M d="x\approx -4.646"/>. Exact form: <M d="x=-2\pm\sqrt{7}"/> (since <M d="\sqrt{28}=2\sqrt{7}"/>). The formula never fails; factoring is just faster when it works.</p></Box>
</div>
)},
{type:"practice",render:()=>(<span>Solve <M d="3x^2-12x=0"/>, then find the vertex of <M d="y=3x^2-12x"/>.</span>),
answer:()=>(
<div>
  <p><strong>Step 1: Look for a common factor.</strong> Both terms contain <M d="3x"/>, so pull it out:</p>
  <M d="3x^2-12x=3x(x-4)" block/>
  <p>Check by multiplying back: <M d="3x\cdot x=3x^2"/> and <M d="3x\cdot(-4)=-12x"/>. Correct.</p>
  <p><strong>Step 2: Zero-product rule.</strong> <M d="3x(x-4)=0"/> means <M d="3x=0"/> or <M d="x-4=0"/>, so <M d="x=0"/> or <M d="x=4"/>.</p>
  <p><strong>Step 3: Vertex.</strong> Here <M d="a=3"/>, <M d="b=-12"/>, so <M d="x_{\text{vertex}}=-\tfrac{-12}{2\cdot 3}=2"/>. (Halfway between the roots 0 and 4, as it should be.) Its height: <M d="y=3(4)-12(2)=12-24=-12"/>.</p>
  <Box color="green"><p>Roots <M d="x=0"/> and <M d="x=4"/>; vertex <M d="(2,-12)"/>. Since <M d="a=3>0"/> the parabola opens upward, so the vertex is its lowest point.</p></Box>
</div>
)},
{type:"practice",render:()=>(<span>For <M d="y=x^2-8x+3"/>, find the vertex and the roots. (The roots will not be whole numbers.)</span>),
answer:()=>(
<div>
  <p><strong>Step 1: Vertex.</strong> <M d="a=1"/>, <M d="b=-8"/>: <M d="x_{\text{vertex}}=-\tfrac{-8}{2}=4"/>. Height: <M d="y=16-32+3=-13"/>. The vertex is <M d="(4,-13)"/>, and since <M d="a>0"/> it is the lowest point.</p>
  <p><strong>Step 2: Try to factor.</strong> Two numbers adding to <M d="-8"/> and multiplying to 3? The only pairs multiplying to 3 are <M d="(1,3)"/> and <M d="(-1,-3)"/>, adding to 4 or <M d="-4"/>. No luck, so use the formula.</p>
  <p><strong>Step 3: Quadratic formula.</strong> <M d="c=3"/>, so <M d="b^2-4ac=64-12=52"/>:</p>
  <M d="x=\frac{8\pm\sqrt{52}}{2}" block/>
  <p><M d="\sqrt{52}\approx 7.2111"/>, giving <M d="x\approx\tfrac{8+7.2111}{2}\approx 7.606"/> and <M d="x\approx\tfrac{8-7.2111}{2}\approx 0.394"/>.</p>
  <p><strong>Step 4: Sanity check with symmetry.</strong> The midpoint of the roots is <M d="\tfrac{7.606+0.394}{2}=4"/>, exactly the vertex. Everything agrees.</p>
  <Box color="green"><p>Vertex <M d="(4,-13)"/>; roots <M d="x\approx 0.394"/> and <M d="x\approx 7.606"/> (exactly <M d="4\pm\sqrt{13}"/>).</p></Box>
</div>
)},
]},

{slug:"business-models",module:"Foundations",title:"Business Models: Cost, Revenue, Profit & Demand",time:"12 min",content:[
{type:"concept",label:"Cost Has Two Parts",render:()=>(
<div>
  <p>Calculus is a set of tools, and tools need something to work on. In this course that something is a handful of business functions: cost, revenue, profit, and demand. Every later lesson differentiates or integrates one of them, so this lesson introduces each as a plain idea before any calculus touches it.</p>
  <p>Start with <strong>cost</strong>. Imagine a bakery. Some bills arrive whether it bakes one loaf or ten thousand: rent, insurance, the oven lease. Those are <strong>fixed costs</strong>. Other costs grow with every loaf: flour, yeast, the electricity to bake it. Those are <strong>variable costs</strong>. Say the fixed bills come to $2,000 a month and each loaf costs $1.50 in ingredients and power. Then the total cost of baking <M d="x"/> loaves in a month is</p>
  <M d="C(x)=2000+1.5x" block/>
  <p>which is just a line from <Ref to="lines"/>: the fixed cost is the <M d="y"/>-intercept (the cost at <M d="x=0"/>, before a single loaf) and the per-loaf cost is the slope.</p>
  <p>A second cost idea is the cost <em>per loaf</em>, called the <strong>average cost</strong>. It is total cost divided by how many you made:</p>
  <M d="AC(x)=\frac{C(x)}{x}=\frac{2000+1.5x}{x}=\frac{2000}{x}+1.5" block/>
  <p>(That last step splits the fraction into <M d="\tfrac{2000}{x}+\tfrac{1.5x}{x}"/>, and the second piece is just 1.5.) Watch what happens as the bakery makes more:</p>
  <Box>
    <p>100 loaves: <M d="AC=\tfrac{2000}{100}+1.5=20+1.5=\$21.50"/> per loaf</p>
    <p>1,000 loaves: <M d="AC=2+1.5=\$3.50"/> per loaf</p>
    <p>10,000 loaves: <M d="AC=0.2+1.5=\$1.70"/> per loaf</p>
  </Box>
  <p>Average cost falls because the same $2,000 of rent is being spread over more and more loaves, so each loaf's share shrinks. It can never fall below $1.50, though, because every loaf still needs its own ingredients. It keeps creeping toward 1.50 without reaching it, an idea <Ref to="infinite-limits"/> makes precise.</p>
</div>
)},
{type:"concept",label:"Price, Demand, and Revenue",render:()=>(
<div>
  <p>Now the money coming in. How many units a business sells depends on the price it charges: charge more and fewer people buy. A <strong>price-demand equation</strong> records that trade-off. The simplest version is a line:</p>
  <M d="p=a-bx" block/>
  <p>where <M d="p"/> is the price per unit and <M d="x"/> is the number of units customers will buy at that price. The slope <M d="-b"/> is negative for the reason just given: to sell more you must charge less. Take</p>
  <M d="p=12-0.01x" block/>
  <p>At <M d="x=0"/> the price is $12 (the most anyone would pay). Every extra 100 units sold requires knocking $1 off the price, because <M d="0.01\times 100=1"/>.</p>
  <p><strong>Revenue</strong> is the total money collected: price per unit times the number of units, <M d="R=p\cdot x"/>. But <M d="p"/> is not a fixed number here; it depends on <M d="x"/>. Substitute the price-demand equation in:</p>
  <M d="R(x)=(12-0.01x)\,x=12x-0.01x^2" block/>
  <p>Look at what just happened. A <em>linear</em> demand equation produced a <em>quadratic</em> revenue function, a parabola from <Ref to="quadratics"/>. Because the coefficient on <M d="x^2"/> is negative, it opens downward: revenue climbs as you sell more, peaks, then falls, because eventually the price cuts needed to sell more units cost more than the extra units bring in. The vertex is at</p>
  <M d="x=-\frac{12}{2(-0.01)}=600\qquad R(600)=12(600)-0.01(600)^2=7200-3600=\$3{,}600" block/>
  <p>So revenue is highest at 600 units, where the price is <M d="12-0.01(600)=\$6"/>.</p>
  <Graph fn={(x)=>12*x-0.01*x*x} xMin={0} xMax={1200} yMin={0} yMax={4000}
    highlights={[{x:600,y:3600,label:"max revenue $3,600 at 600 units",color:"#10b981",lo:[-90,-14]}]}
    caption="Revenue from p = 12 - 0.01x is the parabola 12x - 0.01x squared, peaking at 600 units."/>
</div>
)},
{type:"concept",label:"Profit, Break-Even, and Where Buyers Meet Sellers",render:()=>(
<div>
  <p><strong>Profit</strong> is what is left after paying costs:</p>
  <M d="P(x)=R(x)-C(x)" block/>
  <p>Since <M d="R"/> is a parabola and <M d="C"/> is a line, <M d="P"/> is a parabola too. Its roots, where <M d="P(x)=0"/>, are the <strong>break-even</strong> points: revenue exactly covers cost. Between the two break-even points the business makes money; outside them it loses money. Finding break-even is nothing more than solving a quadratic, which you learned in <Ref to="quadratics"/>.</p>
  <p>One more pair of functions describes a whole <em>market</em> rather than one firm. Plot price on the vertical axis and quantity on the horizontal axis. The <strong>demand curve</strong> <M d="D(x)"/> gives the highest price buyers will pay for the <M d="x"/>-th unit; it slopes down. The <strong>supply curve</strong> <M d="S(x)"/> gives the lowest price sellers will accept for the <M d="x"/>-th unit; it slopes up, because producing more means overtime, extra shifts, and pricier materials, so sellers need a higher price to justify each extra unit. Where the two curves cross is the <strong>equilibrium</strong>: the one quantity and price at which what buyers want equals what sellers offer.</p>
  <p>Example: with <M d="D(x)=50-0.1x"/> and <M d="S(x)=10+0.1x"/>, set them equal and gather the <M d="x"/> terms on one side:</p>
  <M d="50-0.1x=10+0.1x\;\Rightarrow\;40=0.2x\;\Rightarrow\;x=200" block/>
  <p>The price there is <M d="S(200)=10+0.1(200)=\$30"/>. Check: <M d="D(200)=50-20=30"/> too. This market clears at 200 units for $30 each. You will meet exactly these curves again in <Ref to="surplus"/>, where integration measures how much buyers and sellers gain from trading.</p>
  <Graph fns={[(x)=>50-0.1*x,(x)=>10+0.1*x]} xMin={0} xMax={400} yMin={0} yMax={55}
    highlights={[{x:200,y:30,label:"equilibrium (200, $30)",color:"#f59e0b",lo:[10,-14]}]}
    label={<><span style={{color:"#818cf8"}}>Demand</span> <span style={{color:"#e2e8f0"}}>and</span> <span style={{color:"#f472b6"}}>supply</span></>}
    xlab="Quantity" ylab="Price ($)"
    caption="Demand falls and supply rises with quantity; they cross at the equilibrium."/>
</div>
)},
{type:"rule",label:"The Business Functions",render:()=>(
<div>
  <M d="C(x)=\text{fixed cost}+(\text{cost per unit})\,x" block/>
  <M d="AC(x)=\frac{C(x)}{x}" block/>
  <M d="R(x)=p\cdot x\quad\text{with }p\text{ from the price-demand equation}" block/>
  <M d="P(x)=R(x)-C(x)" block/>
  <p><strong>Break-even:</strong> solve <M d="P(x)=0"/>, which is the same as <M d="R(x)=C(x)"/>.</p>
  <p><strong>Equilibrium:</strong> solve <M d="D(x)=S(x)"/> for the quantity, then plug it into either curve for the price.</p>
  <p>Letters to expect from here on: <M d="C"/> cost, <M d="R"/> revenue, <M d="P"/> profit, <M d="x"/> or <M d="q"/> quantity, <M d="p"/> price, <M d="t"/> time. Reading <M d="R(x)"/> as "revenue at x units" makes every later formula easier to follow.</p>
</div>
)},
{type:"example",label:"A Phone-Case Company, Start to Finish",render:()=>(
<div>
  <p><em>"A company sells phone cases. Its fixed costs are $5,000 a month and each case costs $4 to make. The price-demand equation is <M d="p=20-0.01x"/>. Find the revenue and profit functions, the break-even points, the sales level with the most profit, and the sales level with the most revenue."</em></p>
  <p><strong>Step 1: Cost.</strong> Fixed plus variable: <M d="C(x)=5000+4x"/>.</p>
  <p><strong>Step 2: Revenue.</strong> Price times quantity, with the price-demand equation substituted in:</p>
  <M d="R(x)=(20-0.01x)\,x=20x-0.01x^2" block/>
  <p><strong>Step 3: Profit.</strong> Subtract, and be careful to subtract <em>both</em> parts of the cost:</p>
  <M d="P(x)=(20x-0.01x^2)-(5000+4x)=-0.01x^2+16x-5000" block/>
  <p><strong>Step 4: Break-even.</strong> Set <M d="P(x)=0"/>. Multiply through by <M d="-100"/> to clear the decimal: <M d="x^2-1600x+500000=0"/>. This does not factor nicely (two numbers adding to <M d="-1600"/> and multiplying to <M d="500000"/> are not obvious), so use the quadratic formula with <M d="a=1"/>, <M d="b=-1600"/>, <M d="c=500000"/>:</p>
  <M d="x=\frac{1600\pm\sqrt{1600^2-4(500000)}}{2}=\frac{1600\pm\sqrt{2{,}560{,}000-2{,}000{,}000}}{2}=\frac{1600\pm\sqrt{560{,}000}}{2}" block/>
  <p><M d="\sqrt{560{,}000}\approx 748.33"/>, so</p>
  <M d="x\approx\frac{1600-748.33}{2}\approx 425.8\qquad x\approx\frac{1600+748.33}{2}\approx 1174.2" block/>
  <p>The company breaks even at about 426 cases and again at about 1,174 cases. Between those it is profitable.</p>
  <p><strong>Step 5: Most profit.</strong> The vertex of the profit parabola, with <M d="a=-0.01"/>, <M d="b=16"/>:</p>
  <M d="x=-\frac{16}{2(-0.01)}=800\qquad P(800)=-0.01(640{,}000)+16(800)-5000=-6400+12800-5000=\$1{,}400" block/>
  <p><strong>Step 6: Most revenue.</strong> The vertex of the revenue parabola, with <M d="a=-0.01"/>, <M d="b=20"/>:</p>
  <M d="x=-\frac{20}{2(-0.01)}=1000\qquad R(1000)=20000-10000=\$10{,}000" block/>
  <Box color="amber"><p><strong>Notice:</strong> the most revenue happens at 1,000 cases, but the most profit happens at 800. Selling those extra 200 cases brings in more revenue, yet each one costs $4 to make and requires a lower price, so profit is smaller. Maximizing revenue and maximizing profit are different questions with different answers. Keep them apart.</p></Box>
  <Graph fns={[(x)=>20*x-0.01*x*x,(x)=>5000+4*x]} xMin={0} xMax={2000} yMin={0} yMax={14000}
    highlights={[{x:425.8,y:6703,label:"break-even",color:"#f59e0b",lo:[-34,-14]},{x:1174.2,y:9697,label:"break-even",color:"#f59e0b",lo:[8,-14]},{x:800,y:9600,label:"biggest gap: profit $1,400",color:"#10b981",lo:[-70,-16]}]}
    label={<><span style={{color:"#818cf8"}}>Revenue</span> <span style={{color:"#e2e8f0"}}>and</span> <span style={{color:"#f472b6"}}>cost</span></>}
    caption="Profit is the vertical gap between revenue and cost. It is zero where they cross and largest at 800 cases."/>
</div>
)},
{type:"interactive",render:()=>(<ParamExplorer xMin={0} xMax={1600} yMin={0} yMax={12000} min={0} max={1600} step={10} start={800} name="x" hint="cases sold per month"
  intro="Revenue is the indigo parabola and cost is the pink line. Slide the number of cases and watch profit, the gold gap between them, grow, peak at 800, and shrink back into a loss."
  build={(x)=>{const R=20*x-0.01*x*x,C=5000+4*x,P=R-C;return{curves:[{f:(v)=>20*v-0.01*v*v,color:"#818cf8"},{f:(v)=>5000+4*v,color:"#f472b6"}],points:[{x,y:R,color:"#818cf8",label:`R = $${Math.round(R).toLocaleString()}`,lx:10,ly:-12},{x,y:C,color:"#f472b6",label:`C = $${Math.round(C).toLocaleString()}`,lx:10,ly:16}],lines:[{x1:x,y1:C,x2:x,y2:R,color:"#fbbf24",width:3}],formula:`P(${x})=${Math.round(P)}`,caption:P<-0.5?`At ${x} cases the company loses $${Math.abs(Math.round(P)).toLocaleString()}: cost sits above revenue.`:P<0.5?`At ${x} cases the company exactly breaks even.`:`At ${x} cases profit is $${Math.round(P).toLocaleString()}, the length of the gold gap.`};}}/>)},
{type:"practice",render:()=>(<span>A firm has cost <M d="C(x)=1200+8x"/> and price-demand equation <M d="p=40-0.02x"/>. Write <M d="R(x)"/> and <M d="P(x)"/>, then find the profit and the average cost when it sells 500 units.</span>),
answer:()=>(
<div>
  <p><strong>Step 1: Revenue.</strong> Price times quantity: <M d="R(x)=(40-0.02x)\,x=40x-0.02x^2"/>.</p>
  <p><strong>Step 2: Profit.</strong> Subtract the whole cost: <M d="P(x)=(40x-0.02x^2)-(1200+8x)=-0.02x^2+32x-1200"/>.</p>
  <p><strong>Step 3: Profit at 500.</strong></p>
  <M d="P(500)=-0.02(250{,}000)+32(500)-1200=-5000+16000-1200=\$9{,}800" block/>
  <p><strong>Step 4: Average cost at 500.</strong> Total cost first: <M d="C(500)=1200+8(500)=5200"/>. Divide by the units:</p>
  <M d="AC(500)=\frac{5200}{500}=\$10.40\text{ per unit}" block/>
  <p>Notice the per-unit cost is $10.40 even though each unit only costs $8 to make; the extra $2.40 is each unit's share of the $1,200 fixed cost.</p>
  <Box color="green"><p><M d="R(x)=40x-0.02x^2"/>, <M d="P(x)=-0.02x^2+32x-1200"/>, <M d="P(500)=\$9{,}800"/>, <M d="AC(500)=\$10.40"/>.</p></Box>
</div>
)},
{type:"practice",render:()=>(<span>For the same firm, find both break-even points. Then, in a different market, demand is <M d="D(x)=80-0.2x"/> and supply is <M d="S(x)=20+0.1x"/>: find the equilibrium quantity and price.</span>),
answer:()=>(
<div>
  <p><strong>Step 1: Set profit to zero.</strong> <M d="-0.02x^2+32x-1200=0"/>. Multiply through by <M d="-50"/> to clear the decimal:</p>
  <M d="x^2-1600x+60000=0" block/>
  <p><strong>Step 2: Quadratic formula.</strong> <M d="a=1"/>, <M d="b=-1600"/>, <M d="c=60000"/>:</p>
  <M d="x=\frac{1600\pm\sqrt{2{,}560{,}000-240{,}000}}{2}=\frac{1600\pm\sqrt{2{,}320{,}000}}{2}" block/>
  <p><M d="\sqrt{2{,}320{,}000}\approx 1523.15"/>, so</p>
  <M d="x\approx\frac{1600-1523.15}{2}\approx 38.4\qquad x\approx\frac{1600+1523.15}{2}\approx 1561.6" block/>
  <p>The firm breaks even at about 38 units and about 1,562 units, and is profitable in between. Sanity check: 500 units is inside that range, and we found a healthy $9,800 profit there.</p>
  <p><strong>Step 3: Equilibrium.</strong> Set demand equal to supply and gather the <M d="x"/> terms:</p>
  <M d="80-0.2x=20+0.1x\;\Rightarrow\;60=0.3x\;\Rightarrow\;x=200" block/>
  <p>Price: <M d="D(200)=80-0.2(200)=\$40"/>. Check with supply: <M d="S(200)=20+20=40"/>. Both curves agree, which is what equilibrium means.</p>
  <Box color="green"><p>Break-even at about 38.4 and 1,561.6 units. Equilibrium at 200 units and $40.</p></Box>
</div>
)},
]},

{slug:"exponentials",module:"Foundations",title:"Exponential Functions & e",time:"11 min",content:[
{type:"concept",label:"What Exponential Growth Is",render:()=>(
<div>
  <p>In <Ref to="lines"/>, growth was <strong>linear</strong>: you add the <em>same amount</em> every period, like +$0.50 a month. This lesson is a faster kind of growth where you <em>multiply</em> by the same amount every period. That is <strong>exponential</strong> growth.</p>
  <p>Real example: a savings account at 5% interest. You do not earn a fixed number of dollars. You earn 5% <em>of whatever you currently have</em>. The more you have, the more you earn, so it snowballs.</p>

  <p><strong>First, what does an exponent even mean?</strong> Let's not assume it. An exponent is just repeated multiplication. The expression <M d="b^x"/> means "multiply <M d="x"/> copies of <M d="b"/> together":</p>
  <Box>
    <p><M d="2^3 = 2 \times 2 \times 2 = 8"/></p>
    <p><M d="2^4 = 2 \times 2 \times 2 \times 2 = 16"/></p>
  </Box>
  <p>Notice that each time the exponent goes up by 1, you multiply by one more copy of <M d="b"/>. That one idea is the engine behind everything in this lesson.</p>

  <p><strong>The general shape of an exponential function:</strong></p>
  <M d="f(x)=a\cdot b^x" block/>
  <p><M d="a"/> is the <strong>starting amount</strong> (the value when <M d="x=0"/>). <M d="b"/> is the <strong>growth factor</strong> (what you multiply by each period).</p>

  <p><strong>Why is <M d="a"/> the starting amount?</strong> At <M d="x=0"/> we get <M d="f(0)=a\cdot b^0"/>, and <M d="b^0=1"/>, which leaves <M d="f(0)=a"/>. But hold on, why does anything to the zero power equal 1? That is usually just asserted. Here is the reason. Look at the pattern, and notice each step down <em>divides by 2</em>:</p>
  <Box>
    <p><M d="2^3=8"/></p>
    <p><M d="2^2=4"/>  (that is 8 divided by 2)</p>
    <p><M d="2^1=2"/>  (that is 4 divided by 2)</p>
    <p><M d="2^0=1"/>  (that is 2 divided by 2)</p>
  </Box>
  <p>To keep the pattern going, <M d="2^0"/> is forced to be 1. The same logic works for any positive base (the only kind we use in this course), so <M d="b^0=1"/>.</p>
  <p>And the pattern does not stop at zero. Keep stepping down and each step still divides by <M d="b"/>: <M d="2^{-1}=\tfrac{1}{2}"/>, <M d="2^{-2}=\tfrac{1}{4}"/>, and so on. Even in-between exponents like <M d="e^{0.15}"/> fit the same smooth pattern, and your calculator fills them in for you. So "multiply <M d="x"/> copies of <M d="b"/>" is the whole-number picture that anchors the idea, and the pattern extends it to <em>every</em> number on the number line. That is why we can draw <M d="b^x"/> as one unbroken curve.</p>

  <p><strong>What the growth factor <M d="b"/> tells you:</strong></p>
  <p>If <M d="b>1"/>, the amount grows. Take <M d="b=1.05"/>. Why does multiplying by 1.05 mean "plus 5%"? Because <M d="1.05 = 1 + 0.05"/>. The <M d="1"/> keeps everything you already had (that is 100% of it), and the extra <M d="0.05"/> adds another 5% on top.</p>
  <p>If <M d="b"/> is between 0 and 1, the amount shrinks. This is called <strong>decay</strong>. For example <M d="b=0.90"/> keeps 90% and loses 10% each period.</p>

  <p>The single most important base in calculus is the number <M d="e\approx 2.71828"/>. Like <M d="\pi"/> (the circle constant, about 3.14159) it is a fixed number that nature keeps producing, and the next section shows exactly where it comes from. You will use it constantly from here on.</p>

  <Graph fns={[(x) => Math.exp(x), (x) => Math.exp(-x)]} xMin={-3} xMax={3} yMin={-0.5} yMax={8}
    label={<><span style={{color:"#818cf8"}}>Growth</span> <span style={{color:"#e2e8f0"}}>vs</span> <span style={{color:"#f472b6"}}>decay</span></>}
    caption="Blue grows faster and faster as you move right. Pink decays toward 0 but never quite reaches it."
  />
</div>
)},
{type:"concept",label:"Where e Comes From",render:()=>(
<div>
  <p>Banks do not add interest once a year. Some add it monthly, some daily. The formula for interest added <M d="n"/> times a year is</p>
  <M d="A=P\left(1+\frac{r}{n}\right)^{nt}" block/>
  <p>Why that shape? If the yearly rate is <M d="r"/> but interest is added <M d="n"/> times a year, each addition is only a fraction <M d="\tfrac{r}{n}"/> of the rate, so each time you multiply by <M d="1+\tfrac{r}{n}"/>. Over <M d="t"/> years there are <M d="nt"/> such additions, and repeated multiplication is an exponent (that is the whole idea of this lesson). So the growth factor is <M d="\left(1+\tfrac{r}{n}\right)^{nt}"/>.</p>
  <p>Now the experiment that produces <M d="e"/>. Put $1 in an account paying 100% a year (so <M d="r=1"/>) for one year, and add the interest more and more often:</p>
  <Box>
    <p>Once a year (<M d="n=1"/>): <M d="(1+1)^1=2"/></p>
    <p>Twice a year (<M d="n=2"/>): <M d="(1+\tfrac12)^2=1.5^2=2.25"/></p>
    <p>Quarterly (<M d="n=4"/>): <M d="(1.25)^4\approx 2.4414"/></p>
    <p>Monthly (<M d="n=12"/>): <M d="\approx 2.6130"/></p>
    <p>Daily (<M d="n=365"/>): <M d="\approx 2.71457"/></p>
    <p>A million times a year: <M d="\approx 2.71828"/></p>
  </Box>
  <p>Adding interest more often helps, but each step helps less than the last. The values creep up and settle at a ceiling of about 2.71828. That ceiling <em>is</em> <M d="e"/>. It is the growth factor you get when interest is added continuously, every instant, at a 100% rate. For any other rate <M d="r"/> and time <M d="t"/>, the same creeping-up turns <M d="\left(1+\tfrac{r}{n}\right)^{nt}"/> into <M d="e^{rt}"/>, which is why the continuous formula in the next section has <M d="e"/> in it.</p>
  <p>How much does continuous compounding actually matter? Take $10,000 at 5% for 3 years:</p>
  <Box>
    <p>Yearly: <M d="10000(1.05)^3=\$11{,}576.25"/></p>
    <p>Monthly: <M d="10000\left(1+\tfrac{0.05}{12}\right)^{36}\approx\$11{,}614.72"/></p>
    <p>Daily: <M d="10000\left(1+\tfrac{0.05}{365}\right)^{1095}\approx\$11{,}618.22"/></p>
    <p>Continuously: <M d="10000\,e^{0.15}\approx\$11{,}618.34"/></p>
  </Box>
  <p>Going from daily to continuous changes the answer by twelve cents. Continuous compounding is not a trick banks play; it is the clean limiting case, and its formula is far easier to differentiate and integrate than the <M d="n"/>-times version. That is why calculus prefers it.</p>
</div>
)},
{type:"rule",label:"The Formula and the Exponent Rules",render:()=>(
<div>
  <p><strong>The continuous compounding formula</strong> is your main tool for money problems:</p>
  <M d="A=P\cdot e^{rt}" block/>
  <p><M d="P"/> = the principal, meaning how much you start with.</p>
  <p><M d="r"/> = the annual interest rate, written <em>as a decimal</em>.</p>
  <p><M d="t"/> = time in years.</p>
  <p><M d="A"/> = the amount you end with.</p>
  <Box>
    <p><strong>Turning a percent into a decimal.</strong> The word percent means "out of 100." So 5% is <M d="\tfrac{5}{100}=0.05"/>. Quick trick: move the decimal point two places to the left. 5% becomes 0.05, and 12% becomes 0.12.</p>
  </Box>
  <p><strong>Two exponent rules you will reuse,</strong> each with the reason it is true (not just stated):</p>
  <M d="b^x\cdot b^y=b^{x+y}" block/>
  <p>Multiplying stacks the repeated multiplications side by side, so the counts add. Check it: <M d="2^2\cdot 2^3=(2\cdot 2)(2\cdot 2\cdot 2)=2^5"/>, and sure enough <M d="2+3=5"/>.</p>
  <M d="(b^x)^y=b^{xy}" block/>
  <p>Raising a power to a power repeats that whole group, so the counts multiply. Check it: <M d="(2^2)^3=2^2\cdot 2^2\cdot 2^2=2^6"/>, and <M d="2\times 3=6"/>.</p>
  <p style={{marginTop:14}}><strong>Negative and fractional exponents,</strong> which the power rule in <Ref to="power-rule"/> will need. Both come from the pattern you already saw.</p>
  <p>Keep stepping the exponent down past zero. Each step still divides by the base, so <M d="2^{-1}=\tfrac{1}{2}"/>, <M d="2^{-2}=\tfrac{1}{4}"/>, <M d="2^{-3}=\tfrac{1}{8}"/>. In general:</p>
  <M d="b^{-n}=\frac{1}{b^n}" block/>
  <p>A negative exponent means "one over." It does not make anything negative.</p>
  <p>For fractions, ask what <M d="b^{1/2}"/> would have to be. By the first rule, <M d="b^{1/2}\cdot b^{1/2}=b^{1/2+1/2}=b^1=b"/>. So <M d="b^{1/2}"/> is the number that, multiplied by itself, gives <M d="b"/>: the square root. Likewise <M d="b^{1/3}"/> is the cube root (three copies multiply to <M d="b"/>):</p>
  <M d="b^{1/2}=\sqrt{b}\qquad b^{1/3}=\sqrt[3]{b}\qquad 8^{1/3}=2\qquad 4^{3/2}=(4^{1/2})^3=2^3=8" block/>
  <p>The payoff is a rewriting table you will use constantly:</p>
  <Box>
    <p><M d="\dfrac{1}{x}=x^{-1}"/></p>
    <p><M d="\dfrac{1}{x^2}=x^{-2}"/></p>
    <p><M d="\sqrt{x}=x^{1/2}"/></p>
    <p><M d="\dfrac{1}{\sqrt{x}}=x^{-1/2}"/></p>
  </Box>
</div>
)},
{type:"example",label:"Using the Formula",render:()=>(
<div>
  <p>Problem: invest $10,000 at 5% compounded continuously for 3 years. How much do you have at the end?</p>
  <p><strong>Step 1: Match each number to a letter.</strong> "Start with $10,000" is <M d="P=10000"/>. "5%" as a decimal is <M d="r=0.05"/>. "3 years" is <M d="t=3"/>.</p>
  <p><strong>Step 2: Put them into the formula.</strong></p>
  <M d="A=10000\cdot e^{0.05\times 3}=10000\cdot e^{0.15}" block/>
  <p><strong>Step 3: Evaluate the exponential.</strong> On a calculator, <M d="e^{0.15}\approx 1.161834"/> (keep a few extra digits so the next step is exact).</p>
  <M d="A=10000\times 1.161834=\$11{,}618.34" block/>
  <p><strong>Step 4: Interpret it.</strong> You ended with $11,618.34, so you earned <strong>$1,618.34</strong> in interest.</p>
</div>
)},
{type:"interactive",render:()=>(<ParamExplorer xMin={-3} xMax={3} yMin={-0.5} yMax={8} min={0.3} max={2.2} step={0.05} start={1.5} name="b" hint="growth vs decay"
  intro="Exponentials grow by multiplying. Slide b above 1 for growth, below 1 for decay, and watch the whole curve change shape."
  build={(b)=>({curves:[{f:(x)=>Math.pow(b,x),color:"#34d399",fill:true}],points:[{x:0,y:1,color:"#f59e0b",label:"start = 1",lx:-12,ly:-13,anchor:"end"}],formula:`f(x)=${b.toFixed(2)}^{x}`,caption: b>1.02?`Each step to the right multiplies by ${b.toFixed(2)}. That is exponential growth.`: b<0.98?`Each step multiplies by ${b.toFixed(2)}, shrinking toward zero. That is decay.`:"With b = 1 nothing changes: a flat line at 1."})}/>)},
{type:"practice",render:()=>(<span>How long does it take to <strong>double</strong> your money at 6% compounded continuously?</span>),
answer:()=>(
<div>
  <p><strong>Step 1: Turn "double" into math.</strong></p>
  <p>If you start with <M d="P"/> dollars, doubling means you end with <M d="2P"/> dollars. So set the ending amount <M d="A"/> equal to <M d="2P"/> in the formula <M d="A=Pe^{rt}"/>:</p>
  <M d="2P=P\cdot e^{0.06\cdot t}" block/>

  <p><strong>Step 2: Divide both sides by <M d="P"/>.</strong></p>
  <M d="\frac{2P}{P}=e^{0.06t}\;\Rightarrow\;2=e^{0.06t}" block/>
  <p>The <M d="P"/> cancels completely. That is a neat result: the doubling time is the same whether you start with $100 or $1,000,000.</p>

  <p><strong>Step 3: Spot the problem.</strong> The <M d="t"/> we want is stuck up in the exponent:</p>
  <M d="2 = e^{0.06t}" block/>
  <p>You cannot reach it by adding, subtracting, or dividing, because none of those touch an exponent. We need a tool that pulls an exponent back down.</p>

  <p><strong>That tool is <M d="\ln"/> (the natural log), the full subject of the next lesson.</strong> For now you only need one fact about it:</p>
  <Box><p><M d="\ln(e^{\text{anything}}) = \text{that anything}"/>. The <M d="\ln"/> cancels the <M d="e"/> and hands back whatever was in the exponent.</p></Box>

  <p><strong>Step 4: Take <M d="\ln"/> of both sides.</strong></p>
  <M d="\ln(2) = \ln(e^{0.06t})" block/>
  <p>On the right, the <M d="\ln"/> and <M d="e"/> cancel, leaving the exponent alone:</p>
  <M d="\ln(2) = 0.06t" block/>
  <p>Now <M d="t"/> is just multiplied by 0.06, which we can undo.</p>

  <p><strong>Step 5: Divide both sides by 0.06.</strong></p>
  <M d="t = \frac{\ln(2)}{0.06}" block/>
  <p>On a calculator <M d="\ln(2) \approx 0.6931"/> (worth memorizing, it appears a lot):</p>
  <M d="t = \frac{0.6931}{0.06} \approx 11.55 \text{ years}" block/>

  <Box color="green">
    <p>About <strong>11.55 years</strong> to double at 6%.</p>
    <p>Sanity check with the "Rule of 72," a mental shortcut for doubling time: divide 72 by the rate written as a whole number. Here <M d="72\div 6=12"/> years, close to our exact 11.55. (It works because the true doubling factor is <M d="\ln(2)\approx 0.69"/>, about 69 in percent terms, and 72 is a nearby round number that divides evenly by many common rates, which makes the mental math easy.)</p>
  </Box>
</div>
)},
{type:"practice",render:()=>(<span>You invest <strong>$5,000 at 4%</strong> for <strong>10 years</strong>. Find the ending amount with monthly compounding and with continuous compounding, and compare.</span>),
answer:()=>(
<div>
  <p><strong>Step 1: Monthly.</strong> Use <M d="A=P(1+\tfrac{r}{n})^{nt}"/> with <M d="P=5000"/>, <M d="r=0.04"/>, <M d="n=12"/>, <M d="t=10"/>. The exponent is <M d="nt=120"/> and each monthly factor is <M d="1+\tfrac{0.04}{12}\approx 1.003333"/>:</p>
  <M d="A=5000(1.003333)^{120}\approx 5000\times 1.490833\approx\$7{,}454.16" block/>
  <p><strong>Step 2: Continuous.</strong> Use <M d="A=Pe^{rt}"/> with <M d="rt=0.04\times 10=0.4"/>:</p>
  <M d="A=5000\,e^{0.4}\approx 5000\times 1.49182\approx\$7{,}459.12" block/>
  <p><strong>Step 3: Compare.</strong> Continuous compounding earns about $4.96 more over ten years. Small, as the lesson promised, and the continuous version was one line of arithmetic instead of a 120th power.</p>
  <Box color="green"><p>Monthly: about $7,454.16. Continuous: about $7,459.12.</p></Box>
</div>
)},
]},

{slug:"logarithms",module:"Foundations",title:"Logarithmic Functions",time:"10 min",content:[
{type:"concept",label:"What a Logarithm Is",render:()=>(
<div>
  <p>In the last lesson we used <M d="\ln"/> to free <M d="t"/> from an exponent in <M d="2=e^{0.06t}"/>. Now let's understand what <M d="\ln"/> actually is, from scratch.</p>
  <p><M d="\ln(x)"/> (say "natural log of x") is simply the <strong>reverse</strong> of <M d="e^x"/>. They undo each other, the same way subtraction undoes addition, or division undoes multiplication.</p>
  <p>The clearest way to see it: the two operations ask opposite questions.</p>
  <Box>
    <p><M d="e^x"/> asks: "I know the exponent <M d="x"/>. What number do I get?"</p>
    <p><M d="\ln(x)"/> asks: "I know the result <M d="x"/>. What exponent produced it?"</p>
  </Box>
  <p>Concrete example: <M d="e^2\approx 7.389"/>. Going backward, <M d="\ln(7.389)\approx 2"/>, because 2 is exactly the exponent that produced 7.389. The two operations cancel.</p>
  <Box color="amber"><p><strong>Calculator note.</strong> Most calculators have two log buttons. <strong>ln</strong> is the natural log, the one this course uses, and it undoes <M d="e^x"/>. <strong>log</strong> (with no letter) is usually the base-10 log, which undoes <M d="10^x"/> instead. Pressing the wrong one gives a different number: <M d="\ln(100)\approx 4.605"/> but <M d="\log(100)=2"/>. Whenever you see <M d="\ln"/> in this course, press ln.</p></Box>

  <p><strong>Why can you only take <M d="\ln"/> of a positive number?</strong> Most courses state this with no reason. Here is the reason. <M d="\ln(x)"/> is hunting for the exponent that makes <M d="e^{\,?}=x"/>. But <M d="e"/> is a positive number (about 2.718), and a positive number raised to <em>any</em> power stays positive: multiplying positives gives a positive, and even negative exponents only flip it into a fraction like <M d="\tfrac{1}{e^2}"/>, which is still positive. (You saw this in <Ref to="exponentials"/>'s decay graph, which sinks toward 0 but never touches it.) So no exponent can ever produce 0 or a negative result. That is exactly why <M d="\ln(0)"/> and <M d="\ln(-5)"/> do not exist.</p>
  <Graph fn={(x) => Math.log(x)} xMin={-1} xMax={8} yMin={-3} yMax={3}
    highlights={[
      { x: 1, y: 0, label: "ln(1) = 0", color: "#f59e0b", lo: [10, 18] },
      { x: Math.E, y: 1, label: "ln(e) = 1", color: "#10b981", lo: [10, -14] },
    ]}
    label="Graph of ln(x)"
    caption="Only defined for x greater than 0. It passes through (1, 0) because ln(1) = 0."
  />
</div>
)},
{type:"rule",label:"Log Properties (and Why They Work)",render:()=>(
<div>
  <p>These three properties let you break a complicated log into simpler pieces (they hold for positive <M d="a"/> and <M d="b"/>, the only inputs <M d="\ln"/> accepts). Each one is really an exponent rule wearing a different costume.</p>
  <M d="\ln(a\cdot b)=\ln a+\ln b" block/>
  <p>Multiplication becomes addition. Why? A log hands you an exponent, and exponents <em>add</em> when you multiply (<Ref to="exponentials"/>). Check: <M d="\ln(e^2\cdot e^3)=\ln(e^5)=5"/>, and separately <M d="\ln(e^2)+\ln(e^3)=2+3=5"/>. Same answer.</p>
  <M d="\ln\!\left(\frac{a}{b}\right)=\ln a-\ln b" block/>
  <p>Division becomes subtraction, the mirror image. Why? Dividing <em>undoes</em> multiplications, so it removes copies from the stack instead of adding them: <M d="\tfrac{e^5}{e^3}"/> cancels three of the five copies of <M d="e"/>, leaving <M d="e^{5-3}=e^2"/>. The exponent counts subtract, so the logs subtract.</p>
  <M d="\ln(a^n)=n\cdot\ln a" block/>
  <p>A power slides down to the front as a multiplier, because <M d="a^n"/> is <M d="a"/> multiplied <M d="n"/> times, so its log is <M d="\ln a"/> added <M d="n"/> times.</p>
  <p>Two values worth memorizing, both straight from the definition: <M d="\ln(e)=1"/> (the exponent that gives <M d="e"/> is 1) and <M d="\ln(1)=0"/> (the exponent that gives 1 is 0, since <M d="e^0=1"/>).</p>
  <p><strong>The undo relationships</strong> are the whole reason logs exist:</p>
  <M d="\ln(e^x)=x\qquad e^{\ln x}=x" block/>
</div>
)},
{type:"example",label:"Why We Reach for ln",render:()=>(
<div>
  <p>Solve for <M d="x"/>: <M d="\;e^{x}=20"/>.</p>
  <p><strong>Step 1: Notice the trap.</strong> The <M d="x"/> is up in the exponent, so ordinary algebra cannot reach it.</p>
  <p><strong>Step 2: Apply the undo tool.</strong> Take <M d="\ln"/> of both sides, because <M d="\ln"/> cancels <M d="e"/>:</p>
  <M d="\ln(e^{x})=\ln(20)" block/>
  <p>The left side collapses using <M d="\ln(e^x)=x"/>:</p>
  <M d="x=\ln(20)" block/>
  <p><strong>Step 3: Evaluate.</strong> On a calculator <M d="\ln(20)\approx 3.00"/>.</p>
  <Box color="green"><p><M d="x\approx 3.00"/>. Check: <M d="e^{3}\approx 20.09"/>, which rounds back to 20.</p></Box>
</div>
)},
{type:"practice",render:()=>(<span>Solve for <M d="x"/>: <M d="\;\ln(3x-1)=2"/></span>),
answer:()=>(
<div>
  <p><strong>Step 1: Make a plan.</strong> The <M d="x"/> is trapped <em>inside</em> a <M d="\ln"/> this time. To free it, undo the <M d="\ln"/>. Since <M d="e"/> undoes <M d="\ln"/>, we raise <M d="e"/> to the power of both sides.</p>

  <p><strong>Step 2: Raise <M d="e"/> to both sides.</strong></p>
  <M d="e^{\ln(3x-1)}=e^2" block/>
  <p>On the left, <M d="e"/> and <M d="\ln"/> cancel because they are inverses, using <M d="e^{\ln x}=x"/>:</p>
  <M d="3x-1=e^2" block/>

  <p><strong>Step 3: Now it is ordinary algebra.</strong> Add 1 to both sides:</p>
  <M d="3x=e^2+1" block/>
  <p>Divide both sides by 3:</p>
  <M d="x=\frac{e^2+1}{3}" block/>

  <p><strong>Step 4: Put in a number.</strong> Since <M d="e^2\approx 7.389"/>:</p>
  <M d="x=\frac{7.389+1}{3}=\frac{8.389}{3}\approx 2.796" block/>

  <Box color="green">
    <p><M d="x\approx 2.796"/></p>
    <p>Check: <M d="\ln(3\times 2.796-1)\approx\ln(7.39)\approx 2"/>. Correct.</p>
  </Box>
</div>
)},
{type:"practice",render:()=>(<span>A city of <strong>50,000</strong> people grows continuously at <strong>2% a year</strong>, so its population is <M d="P(t)=50000\,e^{0.02t}"/>. In how many years will it reach <strong>80,000</strong>?</span>),
answer:()=>(
<div>
  <p><strong>Step 1: Set up the equation.</strong> We want the <M d="t"/> that makes the population 80,000:</p>
  <M d="80000=50000\,e^{0.02t}" block/>
  <p><strong>Step 2: Isolate the exponential.</strong> Divide both sides by 50,000:</p>
  <M d="1.6=e^{0.02t}" block/>
  <p><strong>Step 3: Free the exponent with <M d="\ln"/>.</strong> Take <M d="\ln"/> of both sides; on the right, <M d="\ln"/> cancels <M d="e"/> and hands back the exponent:</p>
  <M d="\ln(1.6)=0.02t" block/>
  <p><strong>Step 4: Solve for <M d="t"/>.</strong> On a calculator <M d="\ln(1.6)\approx 0.4700"/>:</p>
  <M d="t=\frac{0.4700}{0.02}\approx 23.5\text{ years}" block/>
  <p><strong>Step 5: Check.</strong> <M d="50000\,e^{0.02\times 23.5}=50000\,e^{0.47}\approx 50000\times 1.6\approx 80{,}000"/>. Correct.</p>
  <Box color="green"><p>About <strong>23.5 years</strong>. Same three moves as the doubling-time problem in <Ref to="exponentials"/>: isolate the exponential, take <M d="\ln"/>, divide.</p></Box>
</div>
)},
]},

{slug:"limits",module:"Limits & Continuity",title:"Introduction to Limits",time:"11 min",content:[
{type:"concept",label:"What a Limit Asks",render:()=>(
<div>
  <p>Before we learn derivatives (the main event of calculus), we need to understand <strong>limits</strong>. The idea is simpler than it sounds.</p>
  <p>A limit asks one question: <strong>"What number is <M d="f(x)"/> getting closer and closer to?"</strong></p>
  <p>Let's see this with a real example. Take this function:</p>
  <M d="f(x) = \frac{x^2 - 4}{x - 2}" block/>
  <p>What happens if we plug in <M d="x = 2"/>?</p>
  <M d="f(2) = \frac{4 - 4}{2 - 2} = \frac{0}{0}" block/>
  <p>That breaks: dividing by zero is the first jam from <Ref to="functions"/>. So the function has no value at exactly <M d="x=2"/>. But what if we sneak up on 2, plugging in numbers <em>really close</em> to 2 from both sides?</p>
  <p>Where do these numbers come from? Let's compute the first one by hand so you can see they are not magic. Put <M d="x=1.9"/> into <M d="\dfrac{x^2-4}{x-2}"/>. The top is <M d="1.9^2-4 = 3.61-4 = -0.39"/>. The bottom is <M d="1.9-2 = -0.1"/>. Dividing, <M d="\dfrac{-0.39}{-0.1}=3.9"/> (a negative divided by a negative is positive). Every other row is computed the same way; try one yourself.</p>
  <Box>
    <p><strong>Sneaking up from the left (below 2):</strong></p>
    <p><M d="f(1.9) = 3.9"/></p>
    <p><M d="f(1.99) = 3.99"/></p>
    <p><M d="f(1.999) = 3.999"/></p>
    <p><strong>Sneaking up from the right (above 2):</strong></p>
    <p><M d="f(2.1) = 4.1"/></p>
    <p><M d="f(2.01) = 4.01"/></p>
    <p><M d="f(2.001) = 4.001"/></p>
  </Box>
  <p>See the pattern? From the left: 3.9, 3.99, 3.999, heading toward <strong>4</strong>. From the right: 4.1, 4.01, 4.001, also heading toward <strong>4</strong>.</p>
  <p>Even though the function <em>breaks</em> at exactly 2, we can see exactly where it was <em>headed</em>. That destination is the <strong>limit</strong>.</p>
  <p>We write it like this:</p>
  <M d="\lim_{x \to 2} f(x) = 4" block/>
  <p>Read this as: <em>"the limit of f(x), as x approaches 2, is 4."</em></p>
  <p>One more thing about this example, because it explains the whole picture. That fraction <M d="\dfrac{x^2-4}{x-2}"/> is secretly just the straight line <M d="y=x+2"/> with a single point punched out at <M d="x=2"/> (the first practice problem proves it with algebra). That is exactly why the table marched so neatly toward 4.</p>
  <Graph fn={(x) => x + 2} xMin={-1} xMax={5} yMin={-1} yMax={7}
    highlights={[{ x: 2, y: 4, open: true, label: "hole: f(2) undefined", color: "#f59e0b", lo: [12, 16] }]}
    label="The graph has a hole at x = 2"
    caption="The function follows y = x + 2, but there is a missing dot at (2, 4). The limit is still 4."
  />
</div>
)},
{type:"concept",label:"When You Can Just Plug In",render:()=>(
<div>
  <p>The table method is the honest definition, but most of the time there is a shortcut. If the function has no jam at the target number, then the limit is simply the function's value there. Plug in and you are done:</p>
  <M d="\lim_{x\to 3}\,(x^2+2x)=3^2+2(3)=15" block/>
  <p>Why is that allowed? A polynomial like <M d="x^2+2x"/> (from <Ref to="quadratics"/>) has no fractions and no square roots, so nothing can jam. Its graph is one unbroken curve, and if you sneak up on <M d="x=3"/> along an unbroken curve you arrive exactly at the height <M d="f(3)"/>. There is no hole to fall into. This is called <strong>direct substitution</strong>, and <Ref to="continuity"/> gives the "unbroken" idea its proper name.</p>
  <p>The same reasoning makes limits respect ordinary arithmetic. If <M d="f(x)"/> is heading to <M d="L"/> and <M d="g(x)"/> is heading to <M d="K"/>, then:</p>
  <Box>
    <p><M d="f(x)+g(x)"/> heads to <M d="L+K"/> (and the same with a minus)</p>
    <p><M d="c\cdot f(x)"/> heads to <M d="c\cdot L"/> for any constant <M d="c"/></p>
    <p><M d="f(x)\cdot g(x)"/> heads to <M d="L\cdot K"/></p>
    <p><M d="\dfrac{f(x)}{g(x)}"/> heads to <M d="\dfrac{L}{K}"/>, as long as <M d="K\neq 0"/></p>
  </Box>
  <p>These are called the <strong>limit laws</strong>, and they say something reassuring: you can take a complicated function apart, find the limit of each piece, and put the answers back together. The one exception is that last line. When the bottom heads to zero, plugging in fails, and that is precisely the situation the rest of this lesson is about.</p>
</div>
)},
{type:"rule",label:"One-Sided Limits and the 0/0 Signal",render:()=>(
<div>
  <p><strong>Approaching from each side separately.</strong> In the first example we checked numbers from both sides of 2. Sometimes you need to do this carefully, because a function might approach <em>different</em> values from the left and from the right.</p>
  <p>Think of it like walking along a road toward a bridge. You can approach from the left bank or the right bank. If both sides of the road meet at the same point, the bridge connects. If they do not line up, there is a gap, and the limit does not exist.</p>
  <p>Here we use the letter <M d="c"/> to stand for whatever number <M d="x"/> is approaching. In the first example <M d="c"/> was 2, but the same idea works for any target number.</p>
  <Box>
    <p><M d="\lim_{x\to c^-}f(x)"/> = the value <M d="f(x)"/> approaches from the <strong>left</strong> (using values like 1.9, 1.99, 1.999 when <M d="c=2"/>)</p>
    <p><M d="\lim_{x\to c^+}f(x)"/> = the value <M d="f(x)"/> approaches from the <strong>right</strong> (using values like 2.1, 2.01, 2.001)</p>
  </Box>
  <p>The full limit exists <strong>only if both sides arrive at the same number</strong>.</p>
  <p><strong>Direct substitution.</strong> If plugging in <M d="c"/> causes no jam, the limit is just <M d="f(c)"/>.</p>
  <p><strong>What <M d="\tfrac{0}{0}"/> means.</strong> When you plug in and get <M d="\tfrac{0}{0}"/>, it does NOT mean the answer is 0, and it does NOT mean the limit fails to exist. It is a signal that says: <em>"I cannot tell yet; simplify the algebra first."</em> The fix is almost always the recipe from <Ref to="quadratics"/>: <strong>factor the top and bottom, cancel the common factor, then plug in again.</strong></p>
</div>
)},
{type:"example",label:"Two Sides That Disagree",render:()=>(
<div>
  <p>A courier charges <strong>$5</strong> for any parcel lighter than 2 kg and <strong>$8</strong> for any parcel weighing 2 kg or more. Write the price as a function of the weight <M d="w"/>:</p>
  <M d="f(w)=\begin{cases}5 & \text{if } w<2\\ 8 & \text{if } w\ge 2\end{cases}" block/>
  <p>(That big brace is just a way to write a function with two rules; you read off whichever line matches your input. A function defined this way is called <strong>piecewise</strong>.) What is <M d="\lim_{w\to 2}f(w)"/>?</p>
  <p><strong>From the left:</strong> parcels of 1.9 kg, 1.99 kg, 1.999 kg all cost $5. So <M d="\lim_{w\to 2^-}f(w)=5"/>.</p>
  <p><strong>From the right:</strong> parcels of 2.1 kg, 2.01 kg, 2.001 kg all cost $8. So <M d="\lim_{w\to 2^+}f(w)=8"/>.</p>
  <p>The two sides disagree, 5 versus 8, so <M d="\lim_{w\to 2}f(w)"/> <strong>does not exist</strong>. Notice that the function has a perfectly good value at 2 (it is 8). A limit is about where you are <em>heading</em>, and here the left and right roads head to different bridges.</p>
  <p>Here is an algebraic version of the same thing:</p>
  <M d="g(x)=\begin{cases}x+1 & \text{if } x<2\\ 6-x & \text{if } x\ge 2\end{cases}" block/>
  <p>From the left the first rule applies, and as <M d="x"/> creeps toward 2, <M d="x+1"/> creeps toward <M d="3"/>. From the right the second rule applies, and <M d="6-x"/> creeps toward <M d="4"/>. Left gives 3, right gives 4: the limit at 2 does not exist. The graph shows the leap.</p>
  <Graph fns={[(x)=>x<2?x+1:NaN,(x)=>x>=2?6-x:NaN]} xMin={-1} xMax={5} yMin={0} yMax={6}
    highlights={[{x:2,y:3,open:true,label:"left side heads to 3",color:"#818cf8",lo:[-124,-10]},{x:2,y:4,label:"right side starts at 4",color:"#f472b6",lo:[10,-10]}]}
    caption="A jump: the left piece arrives at height 3 (hollow dot, not included) while the right piece begins at height 4 (solid dot)."/>
  <Box color="green"><p>In both examples the one-sided limits exist but differ, so the two-sided limit does not exist. Business functions with thresholds, such as shipping tiers, tax brackets, and volume discounts, jump exactly like this.</p></Box>
</div>
)},
{type:"interactive",render:()=>(<ParamExplorer xMin={0} xMax={4} yMin={0} yMax={6.5} min={0} max={4} step={0.01} start={1.5} name="x" hint="slide toward x = 2 from either side"
  intro="This is the function (x squared minus 4) over (x minus 2) from the start of the lesson. Slide x toward 2 from the left and from the right and watch where the point is heading. At exactly x = 2 the point vanishes, because the function has no value there."
  build={(x)=>{const at2=Math.abs(x-2)<0.005;const y=at2?null:(x*x-4)/(x-2);return{curves:[{f:(v)=>v+2,color:"#818cf8"}],points:at2?[{x:2,y:4,open:true,color:"#f59e0b",label:"hole at (2, 4)",lx:10,ly:-12}]:[{x:2,y:4,open:true,color:"#f59e0b"},{x,y,color:"#fbbf24",label:`f(${x.toFixed(2)}) = ${y.toFixed(3)}`,lx:x<2?-12:12,ly:-14,anchor:x<2?"end":"start"}],formula:at2?"f(2)=\\tfrac{0}{0}\\ \\text{(undefined)}":`f(${x.toFixed(2)})=${y.toFixed(3)}`,caption:at2?"At exactly x = 2 the function jams: 0/0, no value. Yet the limit is still 4, because both sides were heading there.":x<2?`Approaching from the left: f(x) is ${y.toFixed(3)}, closing in on 4.`:`Approaching from the right: f(x) is ${y.toFixed(3)}, closing in on 4.`};}}/>)},
{type:"practice",render:()=>(<span>Find <M d="\displaystyle\lim_{x\to 2}\frac{x^2-4}{x-2}"/> using algebra (confirming the table from the start of the lesson).</span>),
answer:()=>(
<div>
  <p><strong>Step 1: Try plugging in <M d="x = 2"/> directly.</strong></p>
  <M d="\frac{2^2-4}{2-2}=\frac{4-4}{0}=\frac{0}{0}" block/>
  <p>We got <M d="\tfrac{0}{0}"/>: the signal to simplify first.</p>
  <p><strong>Step 2: Factor the top.</strong> The top, <M d="x^2-4"/>, is a difference of squares from <Ref to="quadratics"/>: <M d="a^2-b^2=(a-b)(a+b)"/> with <M d="a=x"/> and <M d="b=2"/>:</p>
  <M d="x^2 - 4 = (x-2)(x+2)" block/>
  <p>Not convinced? Multiply it back out: <M d="(x-2)(x+2)=x^2+2x-2x-4=x^2-4"/>. The middle terms cancel and we land right back where we started.</p>
  <p><strong>Step 3: Rewrite the fraction with the factored version.</strong></p>
  <M d="\frac{(x-2)(x+2)}{(x-2)}" block/>
  <p>The <M d="(x-2)"/> appears on both top and bottom, so cancel them:</p>
  <M d="= x + 2" block/>
  <p><em>Why can we cancel?</em> For a limit, <M d="x"/> is getting <strong>close</strong> to 2 but is never exactly 2. So <M d="(x-2)"/> is never zero, and dividing by it is safe.</p>
  <p><strong>Step 4: Plug <M d="x = 2"/> into the simplified version.</strong> Now it is direct substitution:</p>
  <M d="\lim_{x\to 2}(x+2) = 2 + 2 = 4" block/>
  <Box color="green">
    <p><M d="\displaystyle\lim_{x\to 2}\frac{x^2-4}{x-2}=4"/></p>
    <p>This confirms what the table showed: the numbers were heading toward 4, and the algebra proves it.</p>
    <p><strong>The recipe when you get <M d="\tfrac{0}{0}"/>:</strong> factor, cancel, plug in again.</p>
  </Box>
</div>
)},
{type:"practice",render:()=>(<span>Find <M d="\displaystyle\lim_{x\to 3}\frac{x^2-x-6}{x-3}"/>.</span>),
answer:()=>(
<div>
  <p><strong>Step 1: Try direct substitution.</strong> Top: <M d="9-3-6=0"/>. Bottom: <M d="3-3=0"/>. That is <M d="\tfrac{0}{0}"/>, so simplify.</p>
  <p><strong>Step 2: Factor the top.</strong> <M d="x^2-x-6"/> is a trinomial (<Ref to="quadratics"/>): we need two numbers that add to <M d="-1"/> and multiply to <M d="-6"/>. Try <M d="-3"/> and <M d="2"/>: <M d="-3+2=-1"/> and <M d="(-3)(2)=-6"/>. So</p>
  <M d="x^2-x-6=(x-3)(x+2)" block/>
  <p>Check: <M d="(x-3)(x+2)=x^2+2x-3x-6=x^2-x-6"/>. Correct.</p>
  <p><strong>Step 3: Cancel.</strong></p>
  <M d="\frac{(x-3)(x+2)}{x-3}=x+2\qquad(x\neq 3)" block/>
  <p><strong>Step 4: Plug in.</strong></p>
  <M d="\lim_{x\to 3}(x+2)=5" block/>
  <p>Sanity check with the table method: at <M d="x=2.99"/>, <M d="\tfrac{2.99^2-2.99-6}{2.99-3}=\tfrac{-0.0499}{-0.01}=4.99"/>, which is closing in on 5.</p>
  <Box color="green"><p><M d="\displaystyle\lim_{x\to 3}\frac{x^2-x-6}{x-3}=5"/>. Same recipe, a different factoring pattern.</p></Box>
</div>
)},
]},

{slug:"infinite-limits",module:"Limits & Continuity",title:"Infinite Limits & Limits at Infinity",time:"10 min",content:[
{type:"concept",label:"Two New Kinds of Limit",render:()=>(
<div>
  <p>In <Ref to="limits"/> we found limits where the answer was a <em>number</em>, like <M d="\lim_{x\to 2}f(x)=4"/>. But sometimes limits do not settle on a nice number. This lesson covers two new situations.</p>
  <p><strong>Situation 1: Infinite limits.</strong> "What happens as <M d="x"/> approaches a specific number, but the function blows up?"</p>
  <p>Think about the function <M d="f(x)=\dfrac{1}{x}"/>. What happens as <M d="x"/> gets really close to 0?</p>
  <p>Remember <M d="\tfrac{1}{x}"/> just means 1 divided by <M d="x"/>, so <M d="f(0.1)=\tfrac{1}{0.1}=10"/> (there are ten tenths in one whole). The rest of the rows work the same way:</p>
  <Box>
    <p><M d="f(0.1)=10"/></p>
    <p><M d="f(0.01)=100"/></p>
    <p><M d="f(0.001)=1000"/></p>
    <p><M d="f(0.0001)=10{,}000"/></p>
  </Box>
  <p>The outputs are getting bigger and bigger, shooting off toward infinity. The function never "arrives" at a number. We write:</p>
  <M d="\lim_{x\to 0^+}\frac{1}{x}=+\infty" block/>
  <p>This does NOT mean the limit equals infinity (infinity is not a number). It means: <em>"the function grows without bound."</em> The limit technically <strong>does not exist</strong>, but we write <M d="+\infty"/> to describe <em>how</em> it fails. From the left the story is the same with a sign flip: <M d="f(-0.1)=-10"/>, <M d="f(-0.01)=-100"/>, so <M d="\lim_{x\to 0^-}\tfrac{1}{x}=-\infty"/>.</p>
  <p>On a graph, this creates a <strong>vertical asymptote</strong>: the graph hugs a vertical line but never crosses it, like a wall the function cannot pass through.</p>
  <Graph fn={(x) => 1/x} xMin={-4} xMax={4} yMin={-6} yMax={6}
    label="f(x) = 1/x"
    caption="Vertical asymptote at x = 0: the graph shoots off to positive infinity on the right of the wall and negative infinity on the left."
  />
  <p><strong>Situation 2: Limits at infinity.</strong> "What happens as <M d="x"/> itself gets really, really big?"</p>
  <p>Now we are asking a different question. Instead of <M d="x"/> approaching a specific number, <M d="x"/> is heading toward <M d="\infty"/>. Does the function level off?</p>
  <p>Look at <M d="f(x)=\dfrac{1}{x}"/> again, but this time let <M d="x"/> grow:</p>
  <Box>
    <p><M d="f(10)=0.1"/></p>
    <p><M d="f(100)=0.01"/></p>
    <p><M d="f(1000)=0.001"/></p>
    <p><M d="f(1{,}000{,}000)=0.000001"/></p>
  </Box>
  <p>The outputs are shrinking toward <strong>0</strong>. They will never reach exactly 0, but they get as close as you want. We write:</p>
  <M d="\lim_{x\to\infty}\frac{1}{x}=0" block/>
  <p>On a graph, this creates a <strong>horizontal asymptote</strong>: the graph levels off and approaches a horizontal line as you look further and further to the right. The bakery's average cost in <Ref to="business-models"/> did exactly this, creeping toward $1.50 per loaf; the second practice problem makes that precise.</p>
</div>
)},
{type:"rule",label:"The Degree Shortcut",render:()=>(
<div>
  <p>For <strong>rational functions</strong> (a polynomial divided by a polynomial, from <Ref to="quadratics"/>) as <M d="x\to\infty"/>, you do not need a table of values. Compare the <strong>degree</strong> (highest power of <M d="x"/>) on top with the degree on the bottom:</p>
  <Box>
    <p><strong>Same degree on top and bottom:</strong> the limit is the ratio of the leading coefficients.</p>
    <p>Example: <M d="\dfrac{3x^2+1}{5x^2-x}"/> has <M d="x^2"/> on top and bottom, so the limit is <M d="\dfrac{3}{5}"/>.</p>
  </Box>
  <Box>
    <p><strong>Top degree smaller than bottom:</strong> the limit is 0. The bottom grows faster and crushes the fraction.</p>
    <p>Example: <M d="\dfrac{2x}{x^2+1}"/> has degree 1 on top and degree 2 on the bottom, so the limit is 0.</p>
  </Box>
  <Box>
    <p><strong>Top degree bigger than bottom:</strong> the limit is <M d="+\infty"/> or <M d="-\infty"/> (no horizontal asymptote). The top grows faster and the whole thing blows up; the sign depends on the signs of the leading terms, but either way the size grows without bound.</p>
    <p>Example: <M d="\dfrac{x^3}{x+1}"/> has degree 3 on top and degree 1 on the bottom, so it blows up to <M d="\infty"/>.</p>
  </Box>
  <p><strong>Vertical asymptotes</strong> live wherever the bottom is zero and the top is not: a nonzero number divided by something tiny is something huge.</p>
</div>
)},
{type:"example",label:"Why the Degree Shortcut Works",render:()=>(
<div>
  <p>Let's see <em>why</em> this works with a concrete example. Consider:</p>
  <M d="\frac{3x^2+1}{5x^2-2x}\quad\text{as }x\to\infty" block/>
  <p>Plug in a huge number, say <M d="x=1{,}000{,}000"/>:</p>
  <p><strong>Top:</strong> <M d="3(1{,}000{,}000)^2+1 = 3{,}000{,}000{,}000{,}001"/></p>
  <p>That "+1" at the end? Totally irrelevant. It is like adding a penny to 3 trillion dollars.</p>
  <p><strong>Bottom:</strong> <M d="5(1{,}000{,}000)^2-2(1{,}000{,}000) = 4{,}999{,}998{,}000{,}000"/></p>
  <p>That "<M d="-2x"/>" part subtracted 2 million from 5 trillion. A rounding error.</p>
  <p>So the ratio is basically <M d="\dfrac{3{,}000{,}000{,}000{,}000}{5{,}000{,}000{,}000{,}000}=\dfrac{3}{5}"/>.</p>
  <p><strong>The lesson:</strong> when <M d="x"/> is enormous, the highest-power terms completely dominate. Everything else is noise. That is why you only need to compare the leading terms.</p>
  <p><strong>The algebra way</strong> (divide everything by <M d="x^2"/>, the highest power in the denominator):</p>
  <p>Divide each term on the top and each term on the bottom by <M d="x^2"/>. Top: <M d="\tfrac{3x^2}{x^2}=3"/>, and <M d="\tfrac{1}{x^2}"/> stays as it is. Bottom: <M d="\tfrac{5x^2}{x^2}=5"/>, and <M d="\tfrac{2x}{x^2}=\tfrac{2}{x}"/> (one <M d="x"/> cancels, since <M d="\tfrac{x}{x^2}=\tfrac1x"/>). That gives:</p>
  <M d="\frac{3x^2+1}{5x^2-2x}=\frac{3+\frac{1}{x^2}}{5-\frac{2}{x}}" block/>
  <p>As <M d="x\to\infty"/>: <M d="\tfrac{1}{x^2}\to 0"/> and <M d="\tfrac{2}{x}\to 0"/>. So we get <M d="\dfrac{3+0}{5-0}=\dfrac{3}{5}"/>.</p>
  <p><strong>A "top smaller" case, the same way.</strong> Take <M d="\dfrac{2x+5}{x^2-1}"/>. At <M d="x=1{,}000"/> the top is about 2,000 and the bottom about 1,000,000, so the fraction is about <M d="\tfrac{2000}{1{,}000{,}000}=0.002"/>. Tiny, and it only gets tinier. The bottom's higher degree wins, and the limit is 0: a horizontal asymptote at <M d="y=0"/>, the <M d="x"/>-axis.</p>
</div>
)},
{type:"practice",render:()=>(<span>Find <M d="\displaystyle\lim_{x\to\infty}\frac{7x^3-2x}{4x^3+x^2+1}"/></span>),
answer:()=>(
<div>
  <p><strong>Step 1: Identify the highest power on top and bottom.</strong></p>
  <p>Top: <M d="7x^3"/>, degree 3. Bottom: <M d="4x^3"/>, degree 3. <strong>Same degree</strong>, so we use the ratio of leading coefficients.</p>
  <p><strong>Step 2: Take the ratio.</strong> Leading coefficient on top: <strong>7</strong>. On the bottom: <strong>4</strong>.</p>
  <M d="\lim_{x\to\infty}\frac{7x^3-2x}{4x^3+x^2+1}=\frac{7}{4}" block/>
  <p><strong>Step 3: Verify the logic.</strong> The <M d="-2x"/>, <M d="x^2"/>, and <M d="+1"/> are all lower-degree terms. When <M d="x"/> is a million, the <M d="x^3"/> terms are in the quintillions and the rest are rounding errors.</p>
  <Box color="green">
    <p><M d="\dfrac{7}{4}"/></p>
    <p>The function has a horizontal asymptote at <M d="y=\tfrac{7}{4}=1.75"/>. As you look further and further right on the graph, the curve flattens out toward 1.75.</p>
  </Box>
</div>
)},
{type:"practice",render:()=>(<span>The bakery in <Ref to="business-models"/> has cost <M d="C(x)=2000+1.5x"/>, so its average cost per loaf is <M d="AC(x)=\dfrac{2000+1.5x}{x}"/>. Find <M d="\displaystyle\lim_{x\to\infty}AC(x)"/> and explain what it means for the bakery.</span>),
answer:()=>(
<div>
  <p><strong>Step 1: Compare degrees.</strong> Top: <M d="1.5x"/>, degree 1. Bottom: <M d="x"/>, degree 1. Same degree, so the limit is the ratio of leading coefficients:</p>
  <M d="\lim_{x\to\infty}\frac{2000+1.5x}{x}=\frac{1.5}{1}=1.5" block/>
  <p><strong>Step 2: See it the algebra way.</strong> Split the fraction: <M d="\tfrac{2000}{x}+\tfrac{1.5x}{x}=\tfrac{2000}{x}+1.5"/>. As <M d="x\to\infty"/>, <M d="\tfrac{2000}{x}\to 0"/>, leaving 1.5. This is the table from <Ref to="business-models"/> ($21.50, then $3.50, then $1.70) written as one line of algebra.</p>
  <p><strong>Step 3: Interpret.</strong> As the bakery bakes more and more, the $2,000 of fixed cost is spread so thin that each loaf's share of it vanishes, and the average cost settles at the $1.50 of ingredients each loaf needs no matter what. The line <M d="y=1.5"/> is a horizontal asymptote: average cost can get as close to $1.50 as you like but never below it.</p>
  <Box color="green"><p><M d="\lim_{x\to\infty}AC(x)=1.5"/>: at huge volumes, average cost is just the variable cost per unit.</p></Box>
</div>
)},
]},

{slug:"continuity",module:"Limits & Continuity",title:"Continuity",time:"10 min",content:[
{type:"concept",label:"Heading There Versus Arriving",render:()=>(
<div>
  <p>In Lessons <Ref to="limits" bare/> and <Ref to="infinite-limits" bare/> we found limits: the value a function is <em>heading toward</em>. But sometimes the function actually <em>arrives</em> there, and sometimes it does not. Continuity tells us which.</p>
  <p><strong>Why should you care?</strong> In the next module we learn derivatives, the most powerful tool in calculus. But here is the catch: <em>you can only take a derivative where the function is continuous</em>. A derivative measures the slope of a smooth curve, and if the curve has a hole or a jump, there is no slope to measure. So continuity is a requirement for taking a derivative. (To be fully precise, continuity is required but is not the whole story. Picture the sharp point at the bottom of a V: coming in from the left, the line tilts one way; coming in from the right, it tilts the other way. Because the two sides disagree about which direction the curve is heading, there is no single slope right at the corner, so a derivative cannot be taken exactly there. We will unpack this when we reach derivatives. For the smooth business curves in this course, continuous means you are good to go.)</p>
  <p>Intuitively, a function is <strong>continuous at a point</strong> if you can draw through that point without lifting your pen. No holes, no jumps, no walls.</p>
  <p><strong>Three types of breaks (discontinuities):</strong></p>
  <Box>
    <p><strong>1. Hole (removable discontinuity).</strong> The function is heading toward a value, but there is a missing point. Like a bridge with one plank removed. We saw this in <Ref to="limits"/>: <M d="\tfrac{x^2-4}{x-2}"/> has a hole at <M d="x=2"/>.</p>
  </Box>
  <Box>
    <p><strong>2. Jump.</strong> The function suddenly leaps from one value to another, like a staircase. The left-side limit and right-side limit exist but do not agree. The courier's price in <Ref to="limits"/> jumped from $5 to $8 at 2 kg.</p>
  </Box>
  <Box>
    <p><strong>3. Vertical asymptote (infinite discontinuity).</strong> The function shoots off to <M d="+\infty"/> or <M d="-\infty"/>. We just saw this in <Ref to="infinite-limits"/>: <M d="\tfrac{1}{x}"/> at <M d="x=0"/>.</p>
  </Box>
</div>
)},
{type:"rule",label:"The Three-Part Continuity Test",render:()=>(
<div>
  <p>A function <M d="f(x)"/> is <strong>continuous at <M d="x=c"/></strong> if ALL three conditions are true:</p>
  <Box>
    <p><strong>Condition 1:</strong> <M d="f(c)"/> is <strong>defined</strong>. There has to actually be a value at that point: no hole, no "undefined."</p>
  </Box>
  <Box>
    <p><strong>Condition 2:</strong> <M d="\lim_{x\to c}f(x)"/> <strong>exists</strong>. The function has to be heading toward <em>something</em> from both sides, and both sides must agree. (Remember from <Ref to="limits"/>: if the left and right limits differ, the limit does not exist.)</p>
  </Box>
  <Box>
    <p><strong>Condition 3:</strong> <M d="\lim_{x\to c}f(x) = f(c)"/>. <strong>The limit equals the actual value.</strong> The place the function is heading must be the same as the place it actually is. No fakeouts.</p>
  </Box>
  <p>If <em>any</em> of these fails, there is a discontinuity at that point.</p>
  <p><strong>Good news: many functions are always continuous.</strong></p>
  <p>Polynomials (like <M d="x^3-2x+1"/>): continuous everywhere. No fractions, no square roots, nothing to break. This is exactly why direct substitution worked in <Ref to="limits"/>.</p>
  <p><M d="e^x"/> (from <Ref to="exponentials"/>): continuous everywhere. Its graph is one smooth, rising curve that never breaks.</p>
  <p><M d="\ln(x)"/> (from <Ref to="logarithms"/>): continuous for all <M d="x>0"/>. It is only defined for positive inputs, but everywhere it does exist it is smooth.</p>
  <p><strong>Rational functions</strong> (a polynomial over a polynomial): continuous everywhere <em>except</em> where the denominator is 0.</p>
</div>
)},
{type:"example",label:"Checking All Three Conditions",render:()=>(
<div>
  <p>Is <M d="f(x)=\dfrac{x^2-9}{x-3}"/> continuous at <M d="x=3"/>?</p>
  <p><strong>Check Condition 1: Is <M d="f(3)"/> defined?</strong></p>
  <M d="f(3)=\frac{3^2-9}{3-3}=\frac{9-9}{0}=\frac{0}{0}" block/>
  <p>Undefined. Condition 1 <strong>fails immediately</strong>, so the function is NOT continuous at <M d="x=3"/>.</p>
  <p>(Technically we can stop here; one failure is enough. But let's keep going to understand <em>what kind</em> of discontinuity this is.)</p>
  <p><strong>Check Condition 2: Does the limit exist?</strong></p>
  <p>Even though <M d="f(3)"/> is undefined, the <em>limit</em> might still exist. Remember from <Ref to="limits"/>: a limit is about where the function is <em>heading</em>, not where it actually is.</p>
  <p>Factor the top (difference of squares): <M d="x^2-9=(x-3)(x+3)"/></p>
  <M d="f(x)=\frac{(x-3)(x+3)}{x-3}=x+3\quad\text{(when }x\neq 3\text{)}" block/>
  <M d="\lim_{x\to 3}(x+3)=6" block/>
  <p>The limit exists and equals 6.</p>
  <p><strong>Diagnosis:</strong> The limit exists (the road leads to 6), but there is no actual value at <M d="x=3"/>. This is a <strong>removable discontinuity</strong>, a hole. The bridge goes to the right place; there is just a missing plank at <M d="x=3"/>.</p>
  <Graph fn={(x) => x + 3} xMin={-1} xMax={6} yMin={0} yMax={9}
    highlights={[{ x: 3, y: 6, open: true, label: "hole at (3, 6)", color: "#f59e0b", lo: [12, 16] }]}
    caption="The function follows y = x + 3, but there is a missing dot at (3, 6)"
  />
</div>
)},
{type:"example",label:"Diagnosing the Courier Jump",render:()=>(
<div>
  <p>Back to the courier from <Ref to="limits"/>: $5 below 2 kg, $8 from 2 kg on. Is the price function continuous at <M d="w=2"/>?</p>
  <p><strong>Condition 1:</strong> <M d="f(2)=8"/>, because a 2 kg parcel falls under the second rule. Defined. Passes.</p>
  <p><strong>Condition 2:</strong> From the left the price heads to 5; from the right it heads to 8. The one-sided limits disagree, so <M d="\lim_{w\to 2}f(w)"/> <strong>does not exist</strong>. Fails.</p>
  <p>Condition 3 cannot even be checked, because there is no limit to compare with. The function is not continuous at 2, and the type of break is a <strong>jump</strong>.</p>
  <Box color="green"><p>Notice the difference from the hole: here the function <em>has</em> a value at the trouble spot. It is the limit that is missing. A hole fails Condition 1; a jump fails Condition 2.</p></Box>
</div>
)},
{type:"practice",render:()=>(<span>Is <M d="g(x)=\dfrac{x+1}{x^2-1}"/> continuous at <M d="x=1"/>? If not, what type of discontinuity?</span>),
answer:()=>(
<div>
  <p><strong>Step 1: Check if <M d="g(1)"/> is defined.</strong></p>
  <M d="g(1)=\frac{1+1}{1^2-1}=\frac{2}{0}" block/>
  <p>Undefined, so NOT continuous. But what type of break is it?</p>
  <p><strong>Step 2: Factor and investigate.</strong> Bottom: <M d="x^2-1=(x-1)(x+1)"/>.</p>
  <M d="g(x)=\frac{x+1}{(x-1)(x+1)}=\frac{1}{x-1}\quad\text{(when }x\neq -1\text{)}" block/>
  <p>The <M d="(x+1)"/> cancels from top and bottom.</p>
  <p><strong>Step 3: Find the limit.</strong></p>
  <M d="\lim_{x\to 1}\frac{1}{x-1}" block/>
  <p>As <M d="x\to 1^+"/> the denominator is tiny and positive, so the fraction heads to <M d="+\infty"/>. As <M d="x\to 1^-"/> the denominator is tiny and negative, so it heads to <M d="-\infty"/>. Left and right do not agree (and both blow up). The limit does <strong>not exist</strong>.</p>
  <Box color="green">
    <p>Not continuous at <M d="x=1"/>. This is a <strong>vertical asymptote</strong> (infinite discontinuity): the graph shoots off to <M d="\pm\infty"/>.</p>
    <p><strong>Key difference from the worked example:</strong> there, <M d="\tfrac{0}{0}"/> led to a hole. Here, <M d="\tfrac{2}{0}"/> (a nonzero number over zero) leads to a vertical asymptote. The type of "bad fraction" tells you the type of break:</p>
    <p><M d="\tfrac{0}{0}"/> means probably a <strong>hole</strong> (factor and check).</p>
    <p><M d="\tfrac{\text{nonzero}}{0}"/> means always a <strong>vertical asymptote</strong>.</p>
  </Box>
</div>
)},
{type:"practice",render:()=>(<span>A function is defined as <M d="h(x)=\dfrac{x^2-1}{x-1}"/> for <M d="x\neq 1"/>, and separately <M d="h(1)=3"/>. Is <M d="h"/> continuous at <M d="x=1"/>? Which condition fails?</span>),
answer:()=>(
<div>
  <p>This one is sneaky: someone has "patched" the hole, but did they patch it at the right height?</p>
  <p><strong>Condition 1: Is <M d="h(1)"/> defined?</strong> Yes, by the separate rule, <M d="h(1)=3"/>. Passes.</p>
  <p><strong>Condition 2: Does the limit exist?</strong> For <M d="x\neq 1"/>, factor: <M d="\tfrac{(x-1)(x+1)}{x-1}=x+1"/>. So</p>
  <M d="\lim_{x\to 1}h(x)=\lim_{x\to 1}(x+1)=2" block/>
  <p>The limit exists and equals 2. Passes.</p>
  <p><strong>Condition 3: Does the limit equal the value?</strong> The limit is 2, but <M d="h(1)=3"/>. They differ. <strong>Fails.</strong></p>
  <p>Picture it: the graph is the line <M d="y=x+1"/> heading toward height 2 from both sides, but at exactly <M d="x=1"/> a lone dot has been placed at height 3 instead. You would have to lift your pen to reach it.</p>
  <Box color="green"><p>Not continuous at <M d="x=1"/>. Condition 3 fails: the patch was placed at the wrong height. Had the rule said <M d="h(1)=2"/>, all three conditions would pass and the hole would be genuinely repaired.</p></Box>
</div>
)},
]},

{slug:"derivative",module:"Derivatives",title:"The Derivative: What It Means",time:"13 min",content:[
{type:"concept",label:"The Big Idea (No Formulas Yet)",render:()=>(
<div>
  <p>The derivative is <strong>the</strong> big idea in calculus. Everything before this was setup. Everything after builds on this. So let's take our time.</p>
  <p><strong>Here is the question the derivative answers:</strong></p>
  <Box color="amber"><p>"How fast is this function changing, <em>right now</em>, at <em>this exact point</em>?"</p></Box>
  <p><strong>Everyday example:</strong> think about driving a car. Your odometer tracks your total distance; that is a function of time. Your <strong>speedometer</strong> tells you how fast that distance is changing <em>right now</em>. The speedometer reading IS the derivative.</p>
  <p>At 2:00 PM you might be going 60 mph. At 2:05 PM you might be going 45 mph. The speed (the derivative) changes from moment to moment; it tells you the <em>rate</em> of change at each instant.</p>
  <p><strong>On a graph, the derivative is the slope of the curve at a specific point.</strong></p>
  <p>For a straight line, the slope is the same everywhere (<Ref to="lines"/>). But for a <em>curve</em>, the slope keeps changing: steeper here, flatter there, maybe even going downhill somewhere else. The derivative captures that changing slope.</p>
</div>
)},
{type:"concept",label:"Step 1: Average Rate of Change (Rise Over Run)",render:()=>(
<div>
  <p>Let's work with <M d="f(x) = x^2"/>, the simple parabola from <Ref to="quadratics"/>. We want to find "how steep is this curve at <M d="x = 1"/>?"</p>
  <p>We do not yet have a tool for curves. But we DO know how to find the slope of a <strong>straight line</strong>: rise over run (<Ref to="lines"/>):</p>
  <M d="\text{slope} = \frac{\text{rise}}{\text{run}} = \frac{y_2 - y_1}{x_2 - x_1}" block/>
  <p>So here is the idea: pick two points on the curve and draw a straight line through them. That line's slope gives us an <em>approximation</em> of the curve's steepness.</p>
  <p>Let's pick <M d="x = 1"/> and <M d="x = 3"/>:</p>
  <Box>
    <p>Point 1: <M d="(1,\; f(1)) = (1,\; 1)"/> (since <M d="1^2 = 1"/>)</p>
    <p>Point 2: <M d="(3,\; f(3)) = (3,\; 9)"/> (since <M d="3^2 = 9"/>)</p>
  </Box>
  <M d="\text{slope} = \frac{9 - 1}{3 - 1} = \frac{8}{2} = 4" block/>
  <Graph fns={[(x) => x * x, (x) => 4 * x - 3]} xMin={-1} xMax={4.5} yMin={-1} yMax={14}
    highlights={[
      { x: 1, y: 1, label: "(1, 1)", color: "#f59e0b", lo: [8, 12] },
      { x: 3, y: 9, label: "(3, 9)", color: "#f59e0b", lo: [-36, -12] },
    ]}
    label={<span style={{color:"#f472b6"}}>Secant line: slope = 4</span>}
    caption="The straight line through (1,1) and (3,9) has slope 4. But is that the slope of the curve at x = 1?"
  />
  <p>This line through two points on a curve is called a <strong>secant line</strong>, and its slope has a name you will hear constantly in business: the <strong>average rate of change</strong> of <M d="f"/> between <M d="x=1"/> and <M d="x=3"/>. It is "average" because it smooths the curve's changing steepness over the whole stretch into one number. The curve is flatter near <M d="x=1"/> and steeper near <M d="x=3"/>, so the average slope of 4 is not the true slope at either point.</p>
  <p><strong>A business average rate of change.</strong> A factory's cost function is <M d="C(x)=1000+25x-0.05x^2"/> dollars for <M d="x"/> items. How fast does cost rise, on average, as production goes from 50 to 100 items? Compute both heights: <M d="C(100)=1000+2500-500=3000"/> and <M d="C(50)=1000+1250-125=2125"/>. Then rise over run:</p>
  <M d="\frac{C(100)-C(50)}{100-50}=\frac{3000-2125}{50}=\frac{875}{50}=17.5\text{ dollars per item}" block/>
  <p>Across that stretch each extra item added $17.50 on average. That is useful, but a manager deciding whether to make the 51st item wants the rate <em>right at</em> 50, not an average over 50 more. Getting from the average rate to the instantaneous rate is the rest of this lesson.</p>
</div>
)},
{type:"concept",label:"Step 2: Squeeze the Points Closer Together",render:()=>(
<div>
  <p>Here is the key insight: <strong>what if we make the second point closer to <M d="x = 1"/>?</strong></p>
  <p>Let's try several second points, each closer to <M d="x = 1"/>, and compute rise over run each time:</p>
  <Box>
    <p><strong>Second point at <M d="x = 3"/>:</strong> slope = <M d="\dfrac{9 - 1}{3 - 1} = \dfrac{8}{2} = 4.0"/></p>
    <p><strong>Second point at <M d="x = 2"/>:</strong> slope = <M d="\dfrac{4 - 1}{2 - 1} = \dfrac{3}{1} = 3.0"/></p>
    <p><strong>Second point at <M d="x = 1.5"/>:</strong> slope = <M d="\dfrac{2.25 - 1}{1.5 - 1} = \dfrac{1.25}{0.5} = 2.5"/></p>
    <p><strong>Second point at <M d="x = 1.1"/>:</strong> slope = <M d="\dfrac{1.21 - 1}{1.1 - 1} = \dfrac{0.21}{0.1} = 2.1"/></p>
    <p><strong>Second point at <M d="x = 1.01"/>:</strong> slope = <M d="\dfrac{1.0201 - 1}{1.01 - 1} = \dfrac{0.0201}{0.01} = 2.01"/></p>
    <p><strong>Second point at <M d="x = 1.001"/>:</strong> slope = <M d="\dfrac{1.002001 - 1}{0.001} = 2.001"/></p>
  </Box>
  <p>See the pattern? As the second point gets closer and closer to <M d="x = 1"/>:</p>
  <p><M d="4.0 \;\to\; 3.0 \;\to\; 2.5 \;\to\; 2.1 \;\to\; 2.01 \;\to\; 2.001 \;\to\; \ldots"/></p>
  <p>The slopes are heading toward <strong>exactly 2</strong>.</p>
  <Graph fns={[
    (x) => x * x,
    (x) => 2 * x - 1,
    (x) => 3 * x - 2,
    (x) => 4 * x - 3,
  ]} xMin={-0.5} xMax={4} yMin={-1} yMax={12}
    highlights={[
      { x: 1, y: 1, label: "x = 1", color: "#f59e0b", lo: [-48, -10] },
    ]}
    label={<><span style={{color:"#e2e8f0"}}>Secant lines getting closer to the </span><span style={{color:"#f472b6"}}>tangent</span></>}
    caption="Blue is the curve x squared. Yellow (slope 4) and green (slope 3) are secant lines. As the second point slides toward x = 1 they rotate down toward the pink line (slope 2), which is the tangent. Its slope, 2, is the derivative at x = 1."
  />
  <p>As the second point approaches the first, the secant line <em>rotates</em> until it lines up with the curve's direction exactly at <M d="x=1"/>. That final line is called the <strong>tangent line</strong>, and its slope IS the derivative. (For this parabola the tangent also happens to touch at just that one point, but the real defining feature of a tangent is that it matches the curve's slope there.)</p>
</div>
)},
{type:"concept",label:"Step 3: The Notation (Putting It in Math Language)",render:()=>(
<div>
  <p>Let's translate what we just did into math notation. We used the big idea of <Ref to="limits"/> without even naming it.</p>
  <p>Here is what we did in words: "Start at <M d="x = 1"/>. Pick a second point that is <M d="h"/> units away (at <M d="x = 1 + h"/>). Compute rise over run. Then let <M d="h"/> shrink to 0."</p>
  <p>Let's write that with symbols. For any function <M d="f(x)"/>:</p>
  <Box>
    <p><strong>First point:</strong> <M d="(x,\; f(x))"/></p>
    <p><strong>Second point:</strong> <M d="(x + h,\; f(x + h))"/>, a distance <M d="h"/> to the right</p>
  </Box>
  <p><strong>Rise</strong> = how much <M d="y"/> changed = <M d="f(x+h) - f(x)"/></p>
  <p><strong>Run</strong> = how much <M d="x"/> changed = <M d="(x+h) - x = h"/></p>
  <p><strong>Slope of the secant line</strong> = rise divided by run:</p>
  <M d="\text{slope} = \frac{f(x+h) - f(x)}{h}" block/>
  <p>Now let the second point slide toward the first, letting <M d="h \to 0"/>:</p>
  <M d="f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}" block/>
  <p>This is the <strong>formal definition of the derivative</strong>. But notice: it is just rise over run from <Ref to="lines"/>, combined with a limit from <Ref to="limits"/>. Nothing new, just combined. (And computing <M d="f(x+h)"/> is exactly the "plugging in an expression" skill from <Ref to="functions"/>.)</p>
  <Box color="amber">
    <p><strong>Reading the notation:</strong></p>
    <p><M d="f'(x)"/>, read "f prime of x," means "the derivative of <M d="f"/> at <M d="x"/>."</p>
    <p><M d="\tfrac{dy}{dx}"/>, read "dee y dee x," means the same thing, written a second way. It is deliberately built to look like the rise-over-run fraction we just used: <M d="dy"/> stands for a tiny change in <M d="y"/> (the rise) and <M d="dx"/> for a tiny change in <M d="x"/> (the run), both shrunk toward zero. So <M d="\tfrac{dy}{dx}"/> is literally tiny-rise over tiny-run, which is exactly the slope. It is one symbol for the slope, not <M d="d"/> times <M d="y"/> divided by <M d="d"/> times <M d="x"/>.</p>
    <p>Both mean: "the slope of the curve at the point <M d="x"/>."</p>
  </Box>
</div>
)},
{type:"rule",label:"Average and Instantaneous Rates",render:()=>(
<div>
  <p><strong>Average rate of change</strong> of <M d="f"/> from <M d="x=a"/> to <M d="x=b"/> (the slope of the secant line):</p>
  <M d="\frac{f(b)-f(a)}{b-a}" block/>
  <p><strong>Instantaneous rate of change</strong> at <M d="x"/>, the derivative (the slope of the tangent line):</p>
  <M d="f'(x)=\frac{dy}{dx}=\lim_{h\to 0}\frac{f(x+h)-f(x)}{h}" block/>
  <p>The four-step recipe for using the definition: compute <M d="f(x+h)"/>; subtract <M d="f(x)"/> to get the rise; divide by <M d="h"/>; let <M d="h\to 0"/>.</p>
</div>
)},
{type:"example",label:"Using the Definition on f(x) = x²",render:()=>(
<div>
  <p>Let's prove algebraically what our table showed: the slope of <M d="f(x) = x^2"/> at any point is <M d="2x"/>.</p>
  <p><strong>Step 1: Compute <M d="f(x+h)"/>.</strong></p>
  <p>Everywhere you see <M d="x"/> in the function, replace it with <M d="(x+h)"/>:</p>
  <M d="f(x+h) = (x+h)^2" block/>
  <p>Expand using <M d="(a+b)^2 = a^2 + 2ab + b^2"/>. Here <M d="(x+h)^2"/> means <M d="(x+h)(x+h)"/>, so multiply every piece by every piece (this is the expansion from <Ref to="functions"/>):</p>
  <M d="(x+h)(x+h) = x\cdot x + x\cdot h + h\cdot x + h\cdot h = x^2 + 2xh + h^2" block/>
  <p>The two middle pieces are each <M d="xh"/>, so together they make <M d="2xh"/>:</p>
  <M d="(x+h)^2 = x^2 + 2xh + h^2" block/>
  <p><strong>Step 2: Compute the rise: <M d="f(x+h) - f(x)"/>.</strong></p>
  <M d="(x^2 + 2xh + h^2) - x^2 = 2xh + h^2" block/>
  <p>The <M d="x^2"/> terms cancel; they are the same in both points.</p>
  <p><strong>Step 3: Compute rise over run: divide by <M d="h"/>.</strong></p>
  <M d="\frac{2xh + h^2}{h}" block/>
  <p>Factor out <M d="h"/> from the top:</p>
  <M d="= \frac{h(2x + h)}{h} = 2x + h" block/>
  <p>(We can cancel the <M d="h"/>'s because <M d="h"/> is approaching 0 but is not <em>exactly</em> 0, the same reasoning as the limit problems in <Ref to="limits"/>.)</p>
  <p><strong>Step 4: Take the limit as <M d="h \to 0"/>.</strong></p>
  <M d="\lim_{h \to 0}(2x + h) = 2x + 0 = 2x" block/>
  <Box color="green">
    <p><M d="f'(x) = 2x"/></p>
    <p><strong>What this tells us about the curve <M d="x^2"/>:</strong></p>
    <p>At <M d="x = 1"/>: slope = <M d="2(1) = 2"/>, matching our table.</p>
    <p>At <M d="x = 3"/>: slope = <M d="2(3) = 6"/>, steeper.</p>
    <p>At <M d="x = 0"/>: slope = <M d="2(0) = 0"/>, flat (the bottom of the parabola).</p>
    <p>At <M d="x = -2"/>: slope = <M d="2(-2) = -4"/>, going downhill.</p>
  </Box>
  <Graph fns={[(x) => x * x, (x) => 2 * x - 1, (x) => 6 * x - 9]} xMin={-3} xMax={4.5} yMin={-3} yMax={16}
    highlights={[
      { x: 1, y: 1, label: "slope = 2", color: "#f472b6", lo: [12, 12] },
      { x: 3, y: 9, label: "slope = 6", color: "#34d399", lo: [12, -16] },
      { x: 0, y: 0, label: "slope = 0", color: "#f59e0b", lo: [12, -14] },
    ]}
    label="f(x) = x² with tangent lines"
    caption="The slope changes at every point. The derivative f'(x) = 2x captures this: it is a formula that gives you the slope anywhere."
  />
</div>
)},
{type:"concept",label:"The Derivative IS a New Function",render:()=>(
<div>
  <p>This is a crucial point: <M d="f'(x) = 2x"/> is itself a <strong>function</strong>. You feed in an <M d="x"/>-value, and it tells you the slope of the original curve at that point.</p>
  <p>Let's graph <em>both</em> the original function and its derivative:</p>
  <Graph fn={(x) => x * x} xMin={-3} xMax={3} yMin={-2} yMax={9}
    label="Original: f(x) = x²"
    caption="The parabola: steep on the sides, flat at the bottom"
  />
  <Graph fn={(x) => 2 * x} xMin={-3} xMax={3} yMin={-6} yMax={6}
    label="Derivative: f'(x) = 2x"
    caption="The slope function: it tells you how steep the parabola is at each x"
  />
  <p><strong>Read them together:</strong></p>
  <Box>
    <p>Where <M d="f(x) = x^2"/> is going <strong>downhill</strong> (left side), <M d="f'(x) = 2x"/> is <strong>negative</strong>.</p>
    <p>Where <M d="f(x)"/> is <strong>flat</strong> (bottom, at <M d="x=0"/>), <M d="f'(x) = 0"/>.</p>
    <p>Where <M d="f(x)"/> is going <strong>uphill</strong> (right side), <M d="f'(x)"/> is <strong>positive</strong>.</p>
    <p>Where <M d="f(x)"/> gets <strong>steeper</strong>, <M d="f'(x)"/> gets <strong>bigger in size</strong> (further from zero: more positive going uphill, more negative going downhill).</p>
  </Box>
  <p>This relationship between a function and its derivative is the heart of calculus. In <Ref to="first-derivative-test"/> we will use it to find the peaks and valleys of any curve.</p>
</div>
)},
{type:"interactive",render:()=>(<SlopeExplorer fn={(x)=>0.25*x*x*x-x} dfn={(x)=>0.75*x*x-1} xMin={-3} xMax={3} yMin={-4} yMax={4} start={-2.2}
  intro="Here is the whole idea of calculus in one picture. The derivative is simply the steepness of the curve at a single point. Drag the dot: where the curve climbs the slope is positive, where it falls it is negative, and at the very top or bottom it is exactly zero."/>)},
{type:"practice",render:()=>(<span>Use the limit definition to find <M d="f'(x)"/> for <M d="f(x) = 3x + 7"/>. Then explain why the answer makes sense.</span>),
answer:()=>(
<div>
  <p><strong>Step 1: Compute <M d="f(x+h)"/>.</strong> Replace <M d="x"/> with <M d="(x+h)"/>:</p>
  <M d="f(x+h) = 3(x+h) + 7 = 3x + 3h + 7" block/>
  <p><strong>Step 2: Compute the rise: <M d="f(x+h) - f(x)"/>.</strong></p>
  <M d="(3x + 3h + 7) - (3x + 7) = 3h" block/>
  <p>Everything cancels except <M d="3h"/>.</p>
  <p><strong>Step 3: Rise over run: divide by <M d="h"/>.</strong></p>
  <M d="\frac{3h}{h} = 3" block/>
  <p><strong>Step 4: Take the limit.</strong></p>
  <M d="\lim_{h \to 0} 3 = 3" block/>
  <p>There is no <M d="h"/> left, so the limit is just 3.</p>
  <Box color="green">
    <p><M d="f'(x) = 3"/></p>
    <p><strong>Why this makes sense:</strong> <M d="f(x) = 3x + 7"/> is a straight line with slope 3 (<Ref to="lines"/>). A line has the <em>same slope everywhere</em>; it does not curve. So the derivative is just the constant 3, at every point. The derivative of a line IS its slope.</p>
    <p><strong>Looking ahead:</strong> computing derivatives with this four-step limit process works, but it is slow. Imagine doing it for <M d="x^{10}"/>. In <Ref to="power-rule"/> we learn the <strong>power rule</strong>, a shortcut that lets you differentiate in seconds.</p>
  </Box>
</div>
)},
{type:"practice",render:()=>(<span>Use the limit definition to find <M d="f'(x)"/> for <M d="f(x)=x^2+4x"/>. Then find the slope of the curve at <M d="x=1"/>.</span>),
answer:()=>(
<div>
  <p><strong>Step 1: Compute <M d="f(x+h)"/>.</strong> Replace every <M d="x"/> with <M d="(x+h)"/>, keeping the parentheses:</p>
  <M d="f(x+h)=(x+h)^2+4(x+h)=x^2+2xh+h^2+4x+4h" block/>
  <p><strong>Step 2: The rise.</strong> Subtract <M d="f(x)=x^2+4x"/>:</p>
  <M d="(x^2+2xh+h^2+4x+4h)-(x^2+4x)=2xh+h^2+4h" block/>
  <p>The <M d="x^2"/> and the <M d="4x"/> both cancel. Every surviving term has an <M d="h"/> in it, which is the sign you did the algebra right.</p>
  <p><strong>Step 3: Divide by <M d="h"/>.</strong> Factor <M d="h"/> out of the top first:</p>
  <M d="\frac{h(2x+h+4)}{h}=2x+h+4" block/>
  <p><strong>Step 4: Let <M d="h\to 0"/>.</strong></p>
  <M d="f'(x)=\lim_{h\to 0}(2x+h+4)=2x+4" block/>
  <p><strong>Slope at <M d="x=1"/>:</strong> <M d="f'(1)=2(1)+4=6"/>.</p>
  <p>Sanity check with a secant: from <M d="x=1"/> to <M d="x=1.01"/>, <M d="f(1)=5"/> and <M d="f(1.01)=1.0201+4.04=5.0601"/>, so the average rate is <M d="\tfrac{0.0601}{0.01}=6.01"/>, closing in on 6.</p>
  <Box color="green"><p><M d="f'(x)=2x+4"/>, and the slope at <M d="x=1"/> is 6. Notice the answer is the derivative of <M d="x^2"/> (which is <M d="2x"/>) plus the derivative of <M d="4x"/> (which is 4, a line's slope): derivatives of added pieces simply add, a rule <Ref to="power-rule"/> makes official.</p></Box>
</div>
)},
]},

{slug:"power-rule",module:"Derivatives",title:"Power Rule & Basic Rules",time:"11 min",content:[
{type:"concept",label:"A Pattern Hiding in the Limit",render:()=>(
<div>
  <p>In <Ref to="derivative"/> we found derivatives with the limit definition. It works, but it is slow. Doing it for <M d="x^{10}"/> would take most of a page.</p>
  <p>The good news: there is a pattern hiding inside all those limit calculations, and once you see it you never need the slow method again. It is called the <strong>power rule</strong>, and it is the single most-used rule in the course.</p>
  <p>Before trusting any shortcut, let's check it against something we already proved the hard way. In <Ref to="derivative"/> we showed the slope of <M d="f(x)=x^2"/> works out to <M d="2x"/>. The power rule (next section) says: bring the 2 down in front and drop the exponent by 1, which gives <M d="2x^{1}=2x"/>. Exact same answer, in one second instead of a page. That match is why the rule is worth memorizing.</p>
  <p>One example is a coincidence; two is a pattern. So let's also grind <M d="f(x)=x^3"/> through the slow method and watch the same shortcut appear. We need <M d="(x+h)^3"/>, which multiplies out to <M d="x^3+3x^2h+3xh^2+h^3"/>. The rise is <M d="3x^2h+3xh^2+h^3"/>; divide by the run <M d="h"/> to get <M d="3x^2+3xh+h^2"/>; now let <M d="h\to 0"/> and the slope is <M d="3x^2"/>. Line the two cases up: <M d="x^2"/> gave <M d="2x^1"/>, and <M d="x^3"/> gives <M d="3x^2"/>. Each time the old exponent drops to the front and the new exponent is one smaller, exactly the power rule. (Proving it for <em>every</em> power at once needs a tool called the binomial theorem, more than we need here; but you have now watched the pattern appear twice from scratch instead of being handed it.)</p>
</div>
)},
{type:"concept",label:"Fractions and Roots Are Powers Too",render:()=>(
<div>
  <p>The power rule is stated for <M d="x^n"/>, and it is tempting to think that means whole-number powers only. It does not. In <Ref to="exponentials"/> you saw that <M d="\tfrac{1}{x}=x^{-1}"/>, <M d="\tfrac{1}{x^2}=x^{-2}"/>, and <M d="\sqrt{x}=x^{1/2}"/>. Rewrite a fraction or a root as a power, and the rule applies unchanged: bring the exponent down, subtract 1 from it.</p>
  <Box>
    <p><M d="\dfrac{1}{x}=x^{-1}"/>: bring down <M d="-1"/>, new exponent <M d="-1-1=-2"/>. So <M d="\dfrac{d}{dx}\Big[\dfrac{1}{x}\Big]=-x^{-2}=-\dfrac{1}{x^2}"/>.</p>
    <p><M d="\dfrac{1}{x^2}=x^{-2}"/>: bring down <M d="-2"/>, new exponent <M d="-3"/>. So <M d="\dfrac{d}{dx}\Big[\dfrac{1}{x^2}\Big]=-2x^{-3}=-\dfrac{2}{x^3}"/>.</p>
    <p><M d="\sqrt{x}=x^{1/2}"/>: bring down <M d="\tfrac12"/>, new exponent <M d="\tfrac12-1=-\tfrac12"/>. So <M d="\dfrac{d}{dx}\big[\sqrt{x}\big]=\tfrac12 x^{-1/2}=\dfrac{1}{2\sqrt{x}}"/>.</p>
  </Box>
  <p>Do the signs make sense? <M d="\tfrac{1}{x}"/> falls as <M d="x"/> grows (for positive <M d="x"/>), so its slope should be negative, and <M d="-\tfrac{1}{x^2}"/> is negative. <M d="\sqrt{x}"/> rises but flattens out, so its slope should be positive and shrinking, and <M d="\tfrac{1}{2\sqrt{x}}"/> is exactly that. The rule and the pictures agree.</p>
  <p>Two habits that prevent most mistakes: rewrite <em>before</em> differentiating (turn every fraction and root into a power first), and rewrite <em>after</em> (turn negative exponents back into fractions so the answer is readable).</p>
</div>
)},
{type:"rule",label:"The Power Rule and Its Helpers",render:()=>(
<div>
  <p><strong>The Power Rule</strong> (the most important rule in the course), valid for any constant exponent <M d="n"/>, whole, negative, or fractional:</p>
  <M d="\frac{d}{dx}\big[x^n\big]=n\cdot x^{n-1}" block/>
  <p>In plain English: <strong>"Bring the exponent down as a multiplier, then subtract 1 from the exponent."</strong></p>
  <Box>
    <p><M d="x^5"/> becomes <M d="5x^4"/> (bring 5 down, exponent becomes 4)</p>
    <p><M d="x^3"/> becomes <M d="3x^2"/></p>
    <p><M d="x^1"/> becomes <M d="1\cdot x^0=1"/> (since <M d="x^0=1"/>, from <Ref to="exponentials"/>)</p>
    <p><M d="x^{-1}"/> becomes <M d="-x^{-2}"/></p>
    <p><M d="x^{1/2}"/> becomes <M d="\tfrac12 x^{-1/2}"/></p>
  </Box>
  <p><strong>Other rules:</strong></p>
  <p><M d="\tfrac{d}{dx}[c]=0"/>: constants do not change, so their rate of change is 0.</p>
  <p><M d="\tfrac{d}{dx}[c\cdot f(x)]=c\cdot f'(x)"/>: constant multipliers just come along for the ride. Why? Multiply a whole function by 3 and every output triples, so every rise triples while the runs stay the same. Slope is rise over run, so every slope triples too: the constant simply multiplies the slope.</p>
  <p><M d="\tfrac{d}{dx}[f\pm g]=f'\pm g'"/>: take each term separately. Why? Over any step, the rise of <M d="f+g"/> is just (rise of <M d="f"/>) plus (rise of <M d="g"/>). Divide by the same run and shrink the step, and the two slopes simply add. (You watched this happen in the second practice of <Ref to="derivative"/>.)</p>
</div>
)},
{type:"example",label:"Fractions, Roots, and Whole Powers Together",render:()=>(
<div>
  <p>Differentiate <M d="f(x)=3\sqrt{x}+\dfrac{5}{x^2}-2x"/>.</p>
  <p><strong>Step 1: Rewrite everything as powers.</strong></p>
  <M d="f(x)=3x^{1/2}+5x^{-2}-2x^{1}" block/>
  <p><strong>Step 2: Power rule on each term.</strong></p>
  <Box>
    <p><M d="3x^{1/2}"/>: bring down <M d="\tfrac12"/>: <M d="3\cdot\tfrac12=\tfrac32"/>; new exponent <M d="-\tfrac12"/>. Result <M d="\tfrac32 x^{-1/2}"/>.</p>
    <p><M d="5x^{-2}"/>: bring down <M d="-2"/>: <M d="5\cdot(-2)=-10"/>; new exponent <M d="-3"/>. Result <M d="-10x^{-3}"/>.</p>
    <p><M d="-2x^{1}"/>: bring down 1; new exponent 0. Result <M d="-2"/>.</p>
  </Box>
  <p><strong>Step 3: Rewrite the answer without negative exponents.</strong></p>
  <M d="f'(x)=\frac{3}{2\sqrt{x}}-\frac{10}{x^3}-2" block/>
  <Box color="green"><p><M d="f'(x)=\dfrac{3}{2\sqrt{x}}-\dfrac{10}{x^3}-2"/>. Rewrite, differentiate, rewrite back.</p></Box>
</div>
)},
{type:"practice",render:()=>(<span>Differentiate <M d="f(x)=4x^5-3x^2+7x-9"/></span>),
answer:()=>(
<div>
  <p>Apply the power rule to each term, one at a time:</p>
  <Box>
    <p><strong>Term 1: <M d="4x^5"/></strong>. The exponent is 5. Bring it down: <M d="5\times 4=20"/>. Subtract 1 from the exponent: <M d="5-1=4"/>. Result: <M d="20x^4"/>.</p>
    <p><strong>Term 2: <M d="-3x^2"/></strong>. Exponent 2. Bring it down: <M d="2\times(-3)=-6"/>. New exponent: 1. Result: <M d="-6x"/>.</p>
    <p><strong>Term 3: <M d="7x"/></strong>. This is <M d="7x^1"/>. Bring the 1 down: <M d="1\times 7=7"/>. New exponent 0, and <M d="x^0=1"/>. Result: <M d="7"/>.</p>
    <p><strong>Term 4: <M d="-9"/></strong>. A constant. Its derivative is 0.</p>
  </Box>
  <p><strong>Combine all results:</strong></p>
  <M d="\boxed{f'(x)=20x^4-6x+7}" block/>
  <Box color="green">
    <p><M d="f'(x)=20x^4-6x+7"/></p>
    <p><strong>The pattern:</strong> multiply coefficient by exponent, reduce the exponent by 1, repeat for each term. Constants vanish.</p>
  </Box>
</div>
)},
{type:"practice",render:()=>(<span>Differentiate <M d="f(x)=\dfrac{2}{x}+4\sqrt{x}-\dfrac{x^3}{3}"/></span>),
answer:()=>(
<div>
  <p><strong>Step 1: Rewrite as powers.</strong> <M d="\tfrac{2}{x}=2x^{-1}"/>, <M d="4\sqrt{x}=4x^{1/2}"/>, and <M d="\tfrac{x^3}{3}=\tfrac13 x^3"/> (dividing by 3 is the same as multiplying by <M d="\tfrac13"/>):</p>
  <M d="f(x)=2x^{-1}+4x^{1/2}-\tfrac13 x^3" block/>
  <p><strong>Step 2: Power rule on each term.</strong></p>
  <Box>
    <p><M d="2x^{-1}"/>: <M d="2\cdot(-1)=-2"/>, exponent <M d="-2"/>. Result <M d="-2x^{-2}"/>.</p>
    <p><M d="4x^{1/2}"/>: <M d="4\cdot\tfrac12=2"/>, exponent <M d="-\tfrac12"/>. Result <M d="2x^{-1/2}"/>.</p>
    <p><M d="-\tfrac13 x^3"/>: <M d="-\tfrac13\cdot 3=-1"/>, exponent 2. Result <M d="-x^2"/>.</p>
  </Box>
  <p><strong>Step 3: Rewrite back.</strong></p>
  <M d="f'(x)=-\frac{2}{x^2}+\frac{2}{\sqrt{x}}-x^2" block/>
  <Box color="green"><p><M d="f'(x)=-\dfrac{2}{x^2}+\dfrac{2}{\sqrt{x}}-x^2"/>. Every fraction and root in this course is a power in disguise.</p></Box>
</div>
)},
]},

{slug:"tangent-lines",module:"Derivatives",title:"Tangent Lines, Linear Approximation & Differentiability",time:"12 min",content:[
{type:"concept",label:"The Line That Hugs the Curve",render:()=>(
<div>
  <p>In <Ref to="derivative"/> the tangent line appeared as the finish line of a limit: the secant lines rotated until they lined up with the curve. Now that the power rule makes slopes cheap, we can write down the tangent line's <em>equation</em>, and it turns out to be one of the most practical objects in the course.</p>
  <p>Take <M d="f(x)=x^2"/> at <M d="x=1"/>. Two facts pin the tangent down: it passes through the point <M d="(1,\,f(1))=(1,\,1)"/>, and its slope is <M d="f'(1)=2\cdot 1=2"/>. A point and a slope is exactly what point-slope form from <Ref to="lines"/> needs:</p>
  <M d="y-1=2(x-1)\;\Rightarrow\;y=2x-1" block/>
  <p>That is the pink line drawn in <Ref to="derivative"/>. Nothing was guessed; it fell straight out of a point and a derivative.</p>
  <p>Now the same idea for any function at any point <M d="x=a"/>. The point is <M d="(a,\,f(a))"/> and the slope is <M d="f'(a)"/>, so point-slope gives <M d="y-f(a)=f'(a)(x-a)"/>, or</p>
  <M d="y=f(a)+f'(a)\,(x-a)" block/>
  <p>Read it as a recipe: start at the curve's height <M d="f(a)"/>, then move along the tangent's slope <M d="f'(a)"/> for a horizontal distance <M d="x-a"/>. Every tangent line problem is three numbers: <M d="a"/>, <M d="f(a)"/>, and <M d="f'(a)"/>.</p>
  <Graph fns={[(x)=>x*x,(x)=>2*x-1]} xMin={-1} xMax={3} yMin={-2} yMax={7}
    highlights={[{x:1,y:1,label:"(1, 1), slope 2",color:"#f59e0b",lo:[12,14]}]}
    label={<><span style={{color:"#818cf8"}}>y = x²</span> <span style={{color:"#e2e8f0"}}>and its tangent</span> <span style={{color:"#f472b6"}}>y = 2x - 1</span></>}
    caption="The tangent at x = 1 matches the curve's height and slope there, then continues straight."/>
</div>
)},
{type:"concept",label:"Using the Tangent to Estimate",render:()=>(
<div>
  <p>Look closely at the graph above near <M d="x=1"/>. The curve and the tangent are almost on top of each other. Zoom in far enough on any smooth curve and it becomes indistinguishable from its tangent line. That observation has a name, <strong>linear approximation</strong>, and a practical use: a line is easy to compute with, so near <M d="a"/> you can use the tangent's value instead of the curve's.</p>
  <p>Try it. What is <M d="f(1.1)=1.1^2"/>? The tangent says <M d="y=2(1.1)-1=1.2"/>. The true value is <M d="1.21"/>. The estimate is off by only <M d="0.01"/>. Now a bigger step: <M d="f(1.5)"/>. Tangent: <M d="2(1.5)-1=2"/>. True: <M d="2.25"/>. Off by <M d="0.25"/>. The further you walk from the point of tangency, the more the curve bends away from the line, and the worse the estimate gets. Close to <M d="a"/>, the tangent is excellent.</p>
  <p>Written with the formula, using <M d="\Delta x"/> ("delta x," the change in <M d="x"/>) for the small step:</p>
  <M d="f(a+\Delta x)\approx f(a)+f'(a)\,\Delta x" block/>
  <p>In words: <em>new value is about old value plus rate times step</em>. If you drive at 60 mph for a tenth of an hour, you go about 6 miles; the formula is that same reasoning applied to any function.</p>
  <p><strong>Where a business meets this idea.</strong> The factory in <Ref to="derivative"/> has cost <M d="C(x)=1000+25x-0.05x^2"/>. At 50 items the cost is <M d="C(50)=2125"/>, and by the power rule <M d="C'(x)=25-0.1x"/>, so <M d="C'(50)=25-5=20"/> dollars per item. What will the 51st item cost? Take one step of <M d="\Delta x=1"/>:</p>
  <M d="C(51)\approx C(50)+C'(50)\cdot 1=2125+20=2145" block/>
  <p>The exact value is <M d="C(51)=1000+1275-130.05=2144.95"/>. The tangent estimate missed by five cents. This "cost of one more item" estimate is so useful that <Ref to="marginal"/> gives it its own name.</p>
</div>
)},
{type:"concept",label:"Units: What a Derivative Is Measured In",render:()=>(
<div>
  <p>A slope is rise over run, so a derivative's units are the output's units <em>per</em> the input's units. If <M d="C(x)"/> is in dollars and <M d="x"/> counts items, then <M d="C'(x)"/> is in <strong>dollars per item</strong>. If distance is in miles and time in hours, the derivative is in <strong>miles per hour</strong>. If a population is in people and time in years, the derivative is in <strong>people per year</strong>.</p>
  <p>Always say the units out loud when you interpret a derivative. "<M d="C'(50)=20"/>" is a number; "at 50 items, cost is rising at $20 per item" is an answer a manager can act on.</p>
</div>
)},
{type:"concept",label:"Where a Derivative Fails",render:()=>(
<div>
  <p>A derivative is a single slope at a point. Three things can stop a curve from having one.</p>
  <p><strong>A corner.</strong> Take the absolute value function <M d="f(x)=|x|"/>, which turns any input positive: <M d="|3|=3"/> and <M d="|-3|=3"/>. Its graph is a V with the point at the origin. To the left of 0 the graph is the line <M d="y=-x"/> (slope <M d="-1"/>); to the right it is <M d="y=x"/> (slope <M d="+1"/>). Sneak up on 0 from the left and the secant slopes are all <M d="-1"/>; from the right they are all <M d="+1"/>. The two sides disagree, so the limit that defines <M d="f'(0)"/> does not exist. No single tangent line fits a corner; you could balance infinitely many lines on the point.</p>
  <Graph fn={(x)=>Math.abs(x)} xMin={-3} xMax={3} yMin={-0.5} yMax={3.5}
    highlights={[{x:0,y:0,label:"corner: no derivative",color:"#f59e0b",lo:[10,-12]}]}
    caption="The absolute value function: slope -1 on the left, +1 on the right, no single slope at the corner."/>
  <p><strong>A vertical tangent.</strong> The cube root <M d="f(x)=x^{1/3}"/> is smooth, but at <M d="x=0"/> its graph turns straight up. By the power rule <M d="f'(x)=\tfrac13 x^{-2/3}=\tfrac{1}{3x^{2/3}}"/>, and at <M d="x=0"/> that is a division by zero. The secant slopes grow without bound as you approach 0. A vertical line has no slope (rise over a run of zero), so there is no derivative there.</p>
  <Graph fn={(x)=>Math.cbrt(x)} xMin={-3} xMax={3} yMin={-2} yMax={2}
    highlights={[{x:0,y:0,label:"vertical tangent",color:"#f59e0b",lo:[10,-12]}]}
    caption="The cube root: the curve stands vertical at the origin, and a vertical line has no slope."/>
  <p><strong>A break.</strong> Any hole, jump, or asymptote from <Ref to="continuity"/> kills the derivative too, because the secant lines have nothing to converge to. This gives a one-way street worth memorizing: <strong>differentiable implies continuous, but continuous does not imply differentiable.</strong> The absolute value function is continuous at 0 (you can draw through it without lifting your pen) yet it has no derivative there.</p>
  <p>For the smooth business curves in this course, polynomials, exponentials, and logs on their domains, none of this happens. But you should know the three ways it can, because <Ref to="first-derivative-test"/> will hunt for peaks and valleys at exactly the points where the derivative is zero <em>or does not exist</em>.</p>
</div>
)},
{type:"rule",label:"Tangent Line, Approximation, Differentiability",render:()=>(
<div>
  <p><strong>Tangent line at <M d="x=a"/>:</strong></p>
  <M d="y=f(a)+f'(a)\,(x-a)" block/>
  <p><strong>Linear approximation for a small step <M d="\Delta x"/> from <M d="a"/>:</strong></p>
  <M d="f(a+\Delta x)\approx f(a)+f'(a)\,\Delta x" block/>
  <p><strong>Units:</strong> a derivative is in (output units) per (input unit).</p>
  <p><strong>A derivative fails to exist at:</strong> a corner (one-sided slopes disagree), a vertical tangent (slope grows without bound), or any break in the function. Differentiable implies continuous; the reverse is false.</p>
</div>
)},
{type:"example",label:"A Tangent Line and an Estimate",render:()=>(
<div>
  <p>Find the tangent line to <M d="f(x)=x^3-2x"/> at <M d="x=2"/>, then use it to estimate <M d="f(2.05)"/>.</p>
  <p><strong>Step 1: The point.</strong> <M d="f(2)=8-4=4"/>, so the point is <M d="(2,4)"/>.</p>
  <p><strong>Step 2: The slope.</strong> By the power rule, <M d="f'(x)=3x^2-2"/>, so <M d="f'(2)=12-2=10"/>.</p>
  <p><strong>Step 3: Point-slope.</strong></p>
  <M d="y=4+10(x-2)=10x-16" block/>
  <p><strong>Step 4: Estimate.</strong> Put <M d="x=2.05"/> into the tangent, not the curve:</p>
  <M d="f(2.05)\approx 10(2.05)-16=20.5-16=4.5" block/>
  <p><strong>Step 5: How good was it?</strong> The exact value is <M d="2.05^3-2(2.05)=8.615125-4.1=4.515125"/>. The estimate was off by about <M d="0.015"/>, less than half a percent, for one line of arithmetic instead of cubing a decimal.</p>
  <Graph fns={[(x)=>x*x*x-2*x,(x)=>10*x-16]} xMin={0.5} xMax={3} yMin={-2} yMax={12}
    highlights={[{x:2,y:4,label:"(2, 4), slope 10",color:"#f59e0b",lo:[-90,-10]}]}
    caption="Near x = 2 the tangent y = 10x - 16 and the cubic are nearly the same line."/>
  <Box color="green"><p>Tangent line <M d="y=10x-16"/>; <M d="f(2.05)\approx 4.5"/> (exact 4.515).</p></Box>
</div>
)},
{type:"example",label:"Estimating Revenue From a Rate",render:()=>(
<div>
  <p>A company's revenue is <M d="R(x)=50x-0.02x^2"/> dollars for <M d="x"/> units. It currently sells 1,000 units. Estimate the revenue from selling 1,010 units without recomputing the whole function.</p>
  <p><strong>Step 1: Current revenue.</strong> <M d="R(1000)=50000-0.02(1{,}000{,}000)=50000-20000=30{,}000"/>.</p>
  <p><strong>Step 2: Current rate.</strong> <M d="R'(x)=50-0.04x"/>, so <M d="R'(1000)=50-40=10"/> dollars per unit. At this volume each extra unit adds about $10 (not the $50 sticker price, because selling more requires lowering the price).</p>
  <p><strong>Step 3: Rate times step.</strong> The step is <M d="\Delta x=10"/> units:</p>
  <M d="R(1010)\approx 30000+10\times 10=30{,}100" block/>
  <p><strong>Step 4: Check.</strong> Exact: <M d="R(1010)=50500-0.02(1{,}020{,}100)=50500-20402=30{,}098"/>. The estimate was $2 high on $30,000, a rounding error.</p>
  <Box color="green"><p>About $30,100 (exact $30,098). Units: revenue in dollars, so <M d="R'"/> is in dollars per unit, and rate times units gives dollars.</p></Box>
</div>
)},
{type:"interactive",render:()=>(<ParamExplorer xMin={-0.5} xMax={2.5} yMin={-1.5} yMax={6.5} min={-1} max={1} step={0.02} start={0.5} name="step" hint="step away from x = 1"
  intro="The curve is y = x squared and the pink line is its tangent at x = 1. Slide the step size to move away from the point of tangency and watch the gap between the curve's true value and the tangent's estimate open up."
  build={(d)=>{const xv=1+d,tru=xv*xv,est=1+2*d,err=tru-est;return{curves:[{f:(v)=>v*v,color:"#818cf8"},{f:(v)=>2*v-1,color:"#f472b6"}],points:[{x:1,y:1,color:"#f59e0b"},{x:xv,y:tru,color:"#818cf8",label:`true ${tru.toFixed(3)}`,lx:10,ly:-12},{x:xv,y:est,color:"#f472b6",label:`estimate ${est.toFixed(3)}`,lx:10,ly:16}],lines:Math.abs(d)>0.01?[{x1:xv,y1:est,x2:xv,y2:tru,color:"#fbbf24",width:3}]:[],formula:`f(1+${d.toFixed(2)})\\approx 1+2(${d.toFixed(2)})=${est.toFixed(3)}`,caption:Math.abs(d)<0.01?"At the point of tangency the estimate is exact: the line and the curve share this point.":`A step of ${d.toFixed(2)}: the tangent says ${est.toFixed(3)}, the curve says ${tru.toFixed(3)}, an error of ${err.toFixed(3)}. ${Math.abs(d)<0.25?"Close to the point, the line is an excellent stand-in.":"Further away, the curve bends off the line and the error grows."}`};}}/>)},
{type:"practice",render:()=>(<span>Find the tangent line to <M d="f(x)=\sqrt{x}"/> at <M d="x=4"/>, then use it to estimate <M d="\sqrt{4.2}"/>.</span>),
answer:()=>(
<div>
  <p><strong>Step 1: The point.</strong> <M d="f(4)=\sqrt{4}=2"/>, so the point is <M d="(4,2)"/>.</p>
  <p><strong>Step 2: The slope.</strong> Rewrite <M d="\sqrt{x}=x^{1/2}"/> and use the power rule (<Ref to="power-rule"/>): <M d="f'(x)=\tfrac12 x^{-1/2}=\tfrac{1}{2\sqrt{x}}"/>. At <M d="x=4"/>: <M d="f'(4)=\tfrac{1}{2\cdot 2}=\tfrac14"/>.</p>
  <p><strong>Step 3: Point-slope.</strong></p>
  <M d="y=2+\tfrac14(x-4)=\tfrac{x}{4}+1" block/>
  <p><strong>Step 4: Estimate.</strong> <M d="\sqrt{4.2}\approx\tfrac{4.2}{4}+1=1.05+1=2.05"/>.</p>
  <p><strong>Step 5: Check.</strong> A calculator gives <M d="\sqrt{4.2}\approx 2.04939"/>. The estimate is high by about <M d="0.0006"/>. Notice it is <em>high</em>: the square root curve bends downward (it flattens as it rises), so its tangent sits above it, and any tangent estimate on this curve overshoots. <Ref to="concavity"/> makes that bending precise.</p>
  <Box color="green"><p>Tangent line <M d="y=\tfrac{x}{4}+1"/>; <M d="\sqrt{4.2}\approx 2.05"/> (exact 2.0494).</p></Box>
</div>
)},
{type:"practice",render:()=>(<span>Is <M d="f(x)=|x-3|"/> differentiable at <M d="x=3"/>? Is it continuous there? Then: where is <M d="g(x)=\dfrac{1}{x}"/> not differentiable, and why?</span>),
answer:()=>(
<div>
  <p><strong>Part 1: <M d="|x-3|"/> at <M d="x=3"/>.</strong> This is the V from the lesson, slid 3 units to the right, so its corner sits at <M d="x=3"/>. Check the two sides. For <M d="x<3"/>, <M d="x-3"/> is negative and the absolute value flips it: <M d="f(x)=3-x"/>, slope <M d="-1"/>. For <M d="x>3"/>, <M d="f(x)=x-3"/>, slope <M d="+1"/>. The one-sided slopes disagree, so <strong>no derivative at 3</strong>.</p>
  <p>Continuity: <M d="f(3)=0"/> is defined, and from both sides the function heads to 0, so the limit exists and equals the value. All three conditions from <Ref to="continuity"/> pass: <strong>continuous</strong>. This is the one-way street in action: continuous, but not differentiable.</p>
  <p><strong>Part 2: <M d="\tfrac{1}{x}"/>.</strong> By the power rule <M d="g'(x)=-\tfrac{1}{x^2}"/>, which exists for every <M d="x"/> except 0. At <M d="x=0"/> the function itself is undefined (the first jam from <Ref to="functions"/>), and there is a vertical asymptote (<Ref to="infinite-limits"/>). A function cannot have a slope at a point where it has no value. So <M d="g"/> is not differentiable at <M d="x=0"/>, and this is the "break" case, not a corner.</p>
  <Box color="green"><p><M d="|x-3|"/>: continuous at 3, not differentiable there (a corner). <M d="\tfrac{1}{x}"/>: not differentiable at 0, because it is not even defined there.</p></Box>
</div>
)},
]},

{slug:"marginal",module:"Derivatives",title:"Marginal Analysis",time:"11 min",content:[
{type:"concept",label:"Marginal Means the Next One",render:()=>(
<div>
  <p>In <Ref to="power-rule"/> we learned a fast way to find derivatives. But <em>why</em> do businesses care about derivatives? This lesson connects derivatives to real business decisions, using the cost, revenue, and profit functions from <Ref to="business-models"/>.</p>
  <p>In business, the derivative gets a special name: the <strong>marginal</strong> function. "Marginal" just means "the next one": what happens when you produce or sell <em>one more</em> unit?</p>
  <Box>
    <p><strong>Cost function</strong> <M d="C(x)"/> = total cost to produce <M d="x"/> items</p>
    <p><strong>Marginal cost</strong> <M d="C'(x)"/> = approximate cost of producing <strong>one more</strong> item, in dollars per item</p>
  </Box>
  <Box>
    <p><strong>Revenue function</strong> <M d="R(x)"/> = total revenue from selling <M d="x"/> items</p>
    <p><strong>Marginal revenue</strong> <M d="R'(x)"/> = approximate revenue from selling <strong>one more</strong> item, in dollars per item</p>
  </Box>
  <Box>
    <p><strong>Profit function</strong> <M d="P(x) = R(x) - C(x)"/></p>
    <p><strong>Marginal profit</strong> <M d="P'(x) = R'(x) - C'(x)"/></p>
  </Box>
  <p><strong>Why "approximate"?</strong> This is the linear approximation from <Ref to="tangent-lines"/> with a step of exactly one unit. The derivative gives the <em>instantaneous</em> rate, dollars per item right at this production level; multiply that rate by a one-unit step and you get the cost of roughly one more item, so <M d="C'(x)"/> estimates <M d="C(x+1)-C(x)"/>. It is only an estimate because "one more item" is a change of <M d="\Delta x=1"/>, not an infinitely small step. But it is usually an excellent estimate, as the first example shows.</p>
  <p><strong>The golden rule of profit:</strong> profit is maximized when marginal revenue equals marginal cost:</p>
  <M d="R'(x) = C'(x)" block/>
  <p>Why? If <M d="R'(x) > C'(x)"/>, the next unit brings in more than it costs, so keep producing. If <M d="R'(x) < C'(x)"/>, the next unit costs more than it earns, so stop. The sweet spot is where they are exactly equal.</p>
  <p>One honest fine print: profit can only <em>peak</em> where <M d="R'(x)=C'(x)"/>, but you should still confirm the point is a peak and not a valley. For the profit curves in this course (downward-opening parabolas from <Ref to="quadratics"/>) it always is, and <Ref to="concavity"/> gives you the formal test.</p>
</div>
)},
{type:"rule",label:"Marginal Functions",render:()=>(
<div>
  <M d="\text{marginal cost}=C'(x)\qquad\text{marginal revenue}=R'(x)\qquad\text{marginal profit}=P'(x)=R'(x)-C'(x)" block/>
  <p>Each estimates the change from one more unit: <M d="C'(x)\approx C(x+1)-C(x)"/>, and likewise for <M d="R"/> and <M d="P"/>. Units are dollars per item.</p>
  <p><strong>Break-even:</strong> <M d="R(x)=C(x)"/>, the roots of <M d="P(x)"/>.</p>
  <p><strong>Maximum profit:</strong> where <M d="P'(x)=0"/>, which is the same as <M d="R'(x)=C'(x)"/>.</p>
</div>
)},
{type:"example",label:"Marginal Cost Versus Exact Cost",render:()=>(
<div>
  <p><em>"A factory's cost function is <M d="C(x) = 1000 + 25x - 0.05x^2"/>. Find the marginal cost at <M d="x = 50"/> and compare it to the exact cost of producing item number 51."</em></p>
  <p><strong>Part A: Find marginal cost (the derivative way).</strong></p>
  <p>Differentiate <M d="C(x)"/> term by term using the power rule from <Ref to="power-rule"/>:</p>
  <Box>
    <p><M d="1000"/> is a constant, so its derivative is <M d="0"/>.</p>
    <p><M d="25x = 25x^1"/>: bring 1 down, <M d="1 \times 25 = 25"/>, new exponent 0, giving <M d="25"/>.</p>
    <p><M d="-0.05x^2"/>: bring 2 down, <M d="2 \times (-0.05) = -0.10"/>, new exponent 1, giving <M d="-0.10x"/>.</p>
  </Box>
  <M d="C'(x) = 25 - 0.10x" block/>
  <p>Now plug in <M d="x = 50"/>:</p>
  <M d="C'(50) = 25 - 0.10(50) = 25 - 5 = \$20\text{ per item}" block/>
  <p><strong>Interpretation:</strong> when you are already making 50 items, the 51st costs approximately <strong>$20</strong>.</p>
  <p><strong>Part B: Find the exact cost (the subtraction way).</strong></p>
  <p>The exact cost of item 51 is <M d="C(51) - C(50)"/>:</p>
  <M d="C(50) = 1000 + 25(50) - 0.05(50)^2 = 1000 + 1250 - 125 = \$2{,}125" block/>
  <M d="C(51) = 1000 + 25(51) - 0.05(51)^2 = 1000 + 1275 - 130.05 = \$2{,}144.95" block/>
  <M d="C(51) - C(50) = 2144.95 - 2125 = \$19.95" block/>
  <Box color="green">
    <p>Marginal cost (derivative estimate): <strong>$20.00</strong></p>
    <p>Exact cost of item 51: <strong>$19.95</strong></p>
    <p>The derivative was off by only 5 cents. That is the power of marginal analysis: a fast, accurate estimate without computing the whole cost function twice.</p>
  </Box>
</div>
)},
{type:"example",label:"Break-Even and Profit Maximization (Visual)",render:()=>(
<div>
  <p>Let's use a simple example to see how revenue and cost curves tell you everything about a business. A company's price-demand equation is <M d="p=12-0.01x"/> (the one from <Ref to="business-models"/>), and its cost is <M d="C(x)=100+2x"/>. Revenue is price times quantity:</p>
  <M d="R(x) = (12-0.01x)\,x = 12x - 0.01x^2 \quad\text{(revenue)}" block/>
  <M d="C(x) = 100 + 2x \quad\text{(cost)}" block/>
  <p><strong>Break-even</strong> is where revenue equals cost. On the graph, it is where the two curves <em>cross</em>. Below that point, cost is higher than revenue (you are losing money). Above it, revenue exceeds cost (you are making money).</p>
  <p><strong>Max profit</strong> is where the <em>gap</em> between revenue and cost is largest. How do we find it? The gap is <M d="P(x) = R(x) - C(x)"/>. The gap is largest where it stops growing, which is where <M d="P'(x) = 0"/>. (A flat spot where <M d="P'(x)=0"/> could in principle be a peak or a valley; here the profit curve opens downward, so its one flat spot is the peak. <Ref to="first-derivative-test"/> shows how to tell a peak from a valley without graphing.)</p>
  <p>Let's find both:</p>
  <p><strong>Profit function:</strong></p>
  <M d="P(x) = (12x - 0.01x^2) - (100 + 2x) = -0.01x^2 + 10x - 100" block/>
  <p><strong>Break-even:</strong> set <M d="P(x) = 0"/>:</p>
  <M d="-0.01x^2 + 10x - 100 = 0" block/>
  <p>Multiply every term by <M d="-100"/> to clear the decimals: <M d="x^2 - 1000x + 10000 = 0"/>. This is a quadratic, so the quadratic formula from <Ref to="quadratics"/> solves it:</p>
  <M d="x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}" block/>
  <p>Here <M d="a=1"/>, <M d="b=-1000"/>, <M d="c=10000"/>. Watch the two sign traps when <M d="b"/> is negative: <M d="-b=+1000"/>, and <M d="b^2=(-1000)^2=+1{,}000{,}000"/>. Putting those in:</p>
  <M d="x=\frac{1000\pm\sqrt{1{,}000{,}000-40{,}000}}{2}=\frac{1000\pm\sqrt{960{,}000}}{2}\approx\frac{1000\pm 979.8}{2}" block/>
  <p>The two solutions are <M d="x\approx 10"/> and <M d="x\approx 990"/>.</p>
  <p>So you break even at about <strong>10 units</strong> and again at <strong>990 units</strong>. Between those, you are profitable.</p>
  <p><strong>Max profit:</strong> set <M d="P'(x) = 0"/>:</p>
  <M d="P'(x) = -0.02x + 10 = 0 \;\Rightarrow\; x = 500" block/>
  <M d="P(500) = -0.01(250000) + 10(500) - 100 = -2500 + 5000 - 100 = \$2{,}400" block/>
  <p>(Check against <Ref to="quadratics"/>: the vertex of <M d="P"/> is at <M d="x=-\tfrac{10}{2(-0.01)}=500"/>. The derivative and the vertex formula agree, as they must, because a parabola's flat spot <em>is</em> its vertex.)</p>
  <Graph fns={[(x) => 12*x - 0.01*x*x, (x) => 100 + 2*x]} xMin={0} xMax={1100} yMin={0} yMax={4500}
    highlights={[
      { x: 10.102, y: 120.2, label: "Break-even", color: "#f59e0b", lo: [10, -14] },
      { x: 500, y: 3500, label: "Max gap", color: "#10b981", lo: [10, -14] },
      { x: 989.898, y: 2079.8, label: "Break-even", color: "#f59e0b", lo: [-80, -14] },
    ]}
    label={<><span style={{color:"#818cf8"}}>Revenue</span> <span style={{color:"#e2e8f0"}}>vs</span> <span style={{color:"#f472b6"}}>Cost</span></>}
    caption="The curves cross at the break-even points. The biggest gap between them is max profit."
  />
  <Graph fn={(x) => -0.01*x*x + 10*x - 100} xMin={0} xMax={1100} yMin={-500} yMax={2800}
    highlights={[
      { x: 10.102, y: 0, label: "Break-even", color: "#f59e0b", lo: [10, -14] },
      { x: 500, y: 2400, label: "Max: $2,400", color: "#10b981", lo: [10, -14] },
      { x: 989.898, y: 0, label: "Break-even", color: "#f59e0b", lo: [-80, -14] },
    ]}
    label="Profit: P(x) = R(x) - C(x)"
    caption="Profit is zero at the break-even points, and peaks at x = 500 where P'(x) = 0"
  />
  <Box color="amber">
    <p><strong>How these two graphs connect:</strong></p>
    <p>The top graph shows <M d="R(x)"/> and <M d="C(x)"/> as separate curves. Where they cross is break-even (profit = 0).</p>
    <p>The bottom graph shows the <em>difference</em> between them. Where it crosses zero is the same break-even points. Where it peaks is max profit.</p>
    <p>The derivative <M d="P'(x) = 0"/> finds that peak. That is the power of marginal analysis.</p>
  </Box>
</div>
)},
{type:"practice",render:()=>(<span>Revenue is <M d="R(x) = 50x - 0.02x^2"/> and cost is <M d="C(x) = 200 + 10x"/>. Find the production level that maximizes profit.</span>),
answer:()=>(
<div>
  <p><strong>Step 1: Write the profit function.</strong></p>
  <M d="P(x) = R(x) - C(x) = (50x - 0.02x^2) - (200 + 10x)" block/>
  <M d="P(x) = -0.02x^2 + 40x - 200" block/>
  <p><strong>Step 2: Find marginal profit (differentiate).</strong></p>
  <Box>
    <p><M d="-0.02x^2"/>: bring 2 down, <M d="2(-0.02) = -0.04"/>, exponent 1, giving <M d="-0.04x"/>.</p>
    <p><M d="40x"/> gives <M d="40"/>.</p>
    <p><M d="-200"/> gives <M d="0"/>.</p>
  </Box>
  <M d="P'(x) = -0.04x + 40" block/>
  <p><strong>Step 3: Set marginal profit to 0</strong> (the golden rule; this is the same as <M d="R'(x) = C'(x)"/>).</p>
  <M d="-0.04x + 40 = 0\;\Rightarrow\;0.04x = 40\;\Rightarrow\;x = \frac{40}{0.04} = 1{,}000" block/>
  <p><strong>Step 4: Find the actual profit.</strong></p>
  <M d="P(1000) = -0.02(1{,}000{,}000) + 40(1000) - 200 = -20{,}000 + 40{,}000 - 200 = \$19{,}800" block/>
  <Box color="green">
    <p>Produce <strong>1,000 units</strong> for maximum profit of <strong>$19,800</strong>.</p>
    <p><strong>Connection to <Ref to="derivative"/>:</strong> the derivative told us the <em>rate</em> profit is changing. When that rate hits zero, profit has peaked; it is not going up anymore.</p>
  </Box>
</div>
)},
{type:"practice",render:()=>(<span>Revenue is <M d="R(x)=80x-0.1x^2"/>. Find the marginal revenue at <M d="x=200"/>, state its units, interpret it, and compare it to the exact revenue from the 201st unit.</span>),
answer:()=>(
<div>
  <p><strong>Step 1: Marginal revenue.</strong> Differentiate: <M d="80x"/> gives 80, and <M d="-0.1x^2"/> gives <M d="-0.2x"/>:</p>
  <M d="R'(x)=80-0.2x\qquad R'(200)=80-40=40" block/>
  <p><strong>Step 2: Units and meaning.</strong> Revenue is in dollars and <M d="x"/> counts units, so <M d="R'"/> is in <strong>dollars per unit</strong>. At 200 units, the next unit sold brings in about <strong>$40</strong>. Notice that is far below the $80 leading coefficient: to sell unit 201 the price on every unit had to come down a little, and that drag is built into the marginal revenue.</p>
  <p><strong>Step 3: Exact revenue from unit 201.</strong></p>
  <M d="R(200)=16000-4000=12{,}000\qquad R(201)=16080-4040.1=12{,}039.90" block/>
  <M d="R(201)-R(200)=39.90" block/>
  <p>The marginal estimate of $40 is off by ten cents.</p>
  <Box color="green"><p><M d="R'(200)=40"/> dollars per unit; the exact gain from unit 201 is $39.90.</p></Box>
</div>
)},
]},

{slug:"exp-log-derivatives",module:"Derivatives",title:"Derivatives of eˣ and ln(x)",time:"10 min",content:[
{type:"concept",label:"Why e Is Special",render:()=>(
<div>
  <p>In Lessons <Ref to="exponentials" bare/> and <Ref to="logarithms" bare/> we learned that <M d="e^x"/> and <M d="\ln(x)"/> are inverses; they undo each other. In <Ref to="power-rule"/> we learned the power rule for derivatives. But the power rule only works on <M d="x^n"/>, a variable raised to a fixed power. What about <M d="e^x"/>, where the variable is <em>in</em> the exponent, and <M d="\ln(x)"/>?</p>
  <p>These two functions have their own special derivative rules, and they are beautifully simple.</p>
  <p><strong>Why is <M d="e"/> so special?</strong> Remember from <Ref to="exponentials"/>: <M d="e \approx 2.71828"/> is the continuous-compounding number. Here is what makes it magical for calculus:</p>
  <Box color="amber">
    <p><M d="e^x"/> is its <strong>own derivative</strong>: if <M d="f(x) = e^x"/>, then <M d="f'(x) = e^x"/>. The rate at which it grows always equals its current value.</p>
    <p>(Constant multiples like <M d="5e^x"/> share this too, since their derivative is <M d="5e^x"/> again. Among all such curves, <M d="e^x"/> is the basic one, the only one passing through <M d="(0,1)"/>.)</p>
  </Box>
  <p>Think about what that means: at the point where <M d="e^x = 5"/>, the function is growing at rate 5. Where <M d="e^x = 100"/>, it is growing at rate 100. The bigger it gets, the faster it grows, and the rate is always <em>exactly</em> equal to the value. No other base does this.</p>
  <p>Let's verify with the limit definition from <Ref to="derivative"/>. At <M d="x = 0"/>, <M d="e^0 = 1"/>. The derivative should also be 1:</p>
  <M d="f'(0) = \lim_{h\to 0}\frac{e^{0+h}-e^0}{h} = \lim_{h\to 0}\frac{e^h - 1}{h}" block/>
  <Box>
    <p><M d="h = 0.1"/>: <M d="\tfrac{e^{0.1}-1}{0.1} = \tfrac{0.10517}{0.1} = 1.0517"/></p>
    <p><M d="h = 0.01"/>: <M d="\tfrac{e^{0.01}-1}{0.01} = 1.00502"/></p>
    <p><M d="h = 0.001"/>: <M d="1.0005"/>, heading toward exactly <strong>1</strong></p>
  </Box>
  <p>That checked the slope only at <M d="x=0"/>. Here is why the slope equals the height at <em>every</em> point, using the exponent rule <M d="e^{x+h}=e^x\cdot e^h"/> from <Ref to="exponentials"/>:</p>
  <M d="f'(x)=\lim_{h\to 0}\frac{e^{x+h}-e^x}{h}=\lim_{h\to 0}\frac{e^x e^h-e^x}{h}=\lim_{h\to 0}e^x\cdot\frac{e^h-1}{h}" block/>
  <p>The <M d="e^x"/> has no <M d="h"/> inside it, so it slides outside the limit as a constant:</p>
  <M d="f'(x)=e^x\cdot\lim_{h\to 0}\frac{e^h-1}{h}=e^x\cdot 1=e^x" block/>
  <p>That last limit is the exact number the table was closing in on; it equals 1. So <M d="f'(x)=e^x"/> at every point, not just at <M d="x=0"/>.</p>
  <Graph fns={[(x) => Math.exp(x), (x) => x + 1, (x) => Math.E * x]} xMin={-2} xMax={3} yMin={-1} yMax={10}
    highlights={[
      { x: 0, y: 1, label: "slope = 1 = height", color: "#f472b6", lo: [12, 14] },
      { x: 1, y: Math.E, label: "slope = e = height", color: "#34d399", lo: [12, -14] },
    ]}
    label="f(x) = e^x with two tangent lines"
    caption="The two straight lines are the tangents at x = 0 (pink) and x = 1 (green). Each tangent's steepness equals the curve's height at that point, 1 and e. That is what makes e^x special."
  />
</div>
)},
{type:"rule",label:"The Two Special Derivatives",render:()=>(
<div>
  <M d="\frac{d}{dx}[e^x] = e^x" block/>
  <p><M d="e^x"/> is its own derivative. The constant multiplier rule from <Ref to="power-rule"/> still applies:</p>
  <M d="\frac{d}{dx}[5e^x] = 5e^x\qquad\frac{d}{dx}[-3e^x] = -3e^x" block/>
  <M d="\frac{d}{dx}[\ln x] = \frac{1}{x}" block/>
  <p>The derivative of <M d="\ln(x)"/> is <M d="\tfrac{1}{x}"/>. Notice: <M d="\ln"/> is a slow-growing curve, and <M d="\tfrac{1}{x}"/> is a shrinking function, so the slope gets flatter and flatter as <M d="x"/> grows. This makes sense because <M d="\ln(x)"/> grows more and more slowly.</p>
  <p>Let's check it the same way we checked <M d="e^x"/>. At <M d="x=1"/> the formula predicts a slope of <M d="\tfrac{1}{1}=1"/>. Using the limit definition with <M d="\ln(1)=0"/>, we compute <M d="\tfrac{\ln(1+h)}{h}"/>: at <M d="h=0.1"/> it is <M d="0.953"/>, at <M d="h=0.01"/> it is <M d="0.995"/>, at <M d="h=0.001"/> it is <M d="0.9995"/>, heading toward exactly 1, which matches <M d="\tfrac{1}{x}"/> at <M d="x=1"/>. The full reason the answer is <em>exactly</em> <M d="\tfrac1x"/> comes from <M d="\ln"/> being the inverse of <M d="e^x"/>, and <Ref to="implicit-related-rates"/> derives it in three lines once you have the chain rule.</p>
  <p><strong>Watch out:</strong> <M d="\ln(x)"/> is only defined for <M d="x > 0"/> (<Ref to="logarithms"/>), so <M d="\tfrac{1}{x}"/> as its derivative also only applies for <M d="x > 0"/>.</p>
</div>
)},
{type:"example",label:"Combining the Power Rule with eˣ and ln",render:()=>(
<div>
  <p>Differentiate <M d="f(x) = x^3 + 4e^x - 7\ln(x)"/>.</p>
  <p>Take each term separately (the sum rule from <Ref to="power-rule"/>):</p>
  <Box>
    <p><strong>Term 1: <M d="x^3"/></strong>, by the power rule: bring 3 down, giving <M d="3x^2"/>.</p>
    <p><strong>Term 2: <M d="4e^x"/></strong>: <M d="e^x"/> is its own derivative and the 4 comes along, giving <M d="4e^x"/>.</p>
    <p><strong>Term 3: <M d="-7\ln(x)"/></strong>: the derivative of <M d="\ln(x)"/> is <M d="\tfrac{1}{x}"/> and the <M d="-7"/> comes along, giving <M d="-\tfrac{7}{x}"/>.</p>
  </Box>
  <M d="\boxed{f'(x) = 3x^2 + 4e^x - \frac{7}{x}}" block/>
</div>
)},
{type:"practice",render:()=>(<span>Differentiate <M d="g(x) = 2e^x + 5\ln(x) - x^4 + 10"/></span>),
answer:()=>(
<div>
  <p>Take each term one at a time:</p>
  <Box>
    <p><strong><M d="2e^x"/></strong>: <M d="e^x"/> is its own derivative, giving <M d="2e^x"/>.</p>
    <p><strong><M d="5\ln(x)"/></strong>: <M d="\tfrac{d}{dx}[\ln x] = \tfrac{1}{x}"/>, giving <M d="\tfrac{5}{x}"/>.</p>
    <p><strong><M d="-x^4"/></strong>, by the power rule: <M d="4 \times (-1) = -4"/>, exponent <M d="4-1=3"/>, giving <M d="-4x^3"/>.</p>
    <p><strong><M d="+10"/></strong>: a constant, giving <M d="0"/>.</p>
  </Box>
  <M d="\boxed{g'(x) = 2e^x + \frac{5}{x} - 4x^3}" block/>
  <Box color="green">
    <p><M d="g'(x) = 2e^x + \tfrac{5}{x} - 4x^3"/></p>
    <p><strong>Toolkit so far:</strong> the power rule handles <M d="x^n"/>. This lesson adds <M d="e^x"/> and <M d="\ln(x)"/>. Next up: what to do when functions are <em>multiplied</em> or <em>divided</em>.</p>
  </Box>
</div>
)},
{type:"practice",render:()=>(<span>Let <M d="f(x)=3e^x-2\ln(x)+x^2"/>. Find <M d="f'(x)"/>, then the slope of the curve at <M d="x=1"/>, as a decimal.</span>),
answer:()=>(
<div>
  <p><strong>Step 1: Differentiate term by term.</strong></p>
  <Box>
    <p><M d="3e^x"/> gives <M d="3e^x"/>.</p>
    <p><M d="-2\ln(x)"/> gives <M d="-\tfrac{2}{x}"/>.</p>
    <p><M d="x^2"/> gives <M d="2x"/>.</p>
  </Box>
  <M d="f'(x)=3e^x-\frac{2}{x}+2x" block/>
  <p><strong>Step 2: Evaluate at <M d="x=1"/>.</strong> Use <M d="e^1=e"/>, <M d="\tfrac{2}{1}=2"/>, and <M d="2(1)=2"/>:</p>
  <M d="f'(1)=3e-2+2=3e\approx 3(2.71828)\approx 8.155" block/>
  <p>The <M d="-2"/> and <M d="+2"/> cancel, so the slope at <M d="x=1"/> is simply <M d="3e"/>, a little over 8. The curve is climbing steeply there, and almost all of that steepness comes from the <M d="3e^x"/> term.</p>
  <Box color="green"><p><M d="f'(x)=3e^x-\tfrac{2}{x}+2x"/>, and <M d="f'(1)=3e\approx 8.155"/>.</p></Box>
</div>
)},
]},

{slug:"product-quotient",module:"Derivatives",title:"Product & Quotient Rules",time:"11 min",content:[
{type:"concept",label:"Why You Cannot Just Multiply Derivatives",render:()=>(
<div>
  <p>So far our derivative toolkit handles individual terms (<M d="x^n"/>, <M d="e^x"/>, <M d="\ln x"/>) added or subtracted. But what about functions that are <strong>multiplied</strong> or <strong>divided</strong>?</p>
  <p><strong>Here is the trap.</strong> It is tempting to think "derivative of a product equals product of the derivatives." Let's test that with <M d="f(x) = x \cdot x = x^2"/>:</p>
  <Box>
    <p>If the "just multiply" rule worked: <M d="\tfrac{d}{dx}[x] \cdot \tfrac{d}{dx}[x] = 1 \cdot 1 = 1"/></p>
    <p>But we <em>know</em> from <Ref to="derivative"/>: <M d="\tfrac{d}{dx}[x^2] = 2x"/></p>
    <p><strong>1 is not 2x.</strong> The "just multiply" approach is <strong>wrong</strong>.</p>
  </Box>
  <p><strong>So what IS the right reasoning?</strong> Picture a rectangle whose width is <M d="u"/> and whose height is <M d="v"/>. Its area is <M d="u\cdot v"/>, exactly our product. Now nudge <M d="x"/> up a tiny bit. The width grows by a thin sliver (it grows at rate <M d="u'"/>) and the height grows by a thin sliver (rate <M d="v'"/>). The area picks up a strip along one side, a strip along the other, and a tiny corner square:</p>
  <Box>
    <p>side strip 1: <M d="u'\cdot v"/> (the whole height, times how fast the width grew)</p>
    <p>side strip 2: <M d="u\cdot v'"/> (the whole width, times how fast the height grew)</p>
    <p>corner: <M d="u'\cdot v'"/>, the product of two slivers, so tiny we ignore it</p>
  </Box>
  <p>So the area grows at rate <M d="u'v + uv'"/>. That is the product rule. And notice: the naive "just multiply the derivatives" guess (<M d="u'v'"/>) is exactly that throwaway corner, which is why it gave the wrong answer above.</p>
  <p>We need special rules for products and quotients.</p>
</div>
)},
{type:"rule",label:"Product Rule and Quotient Rule",render:()=>(
<div>
  <p><strong>Product Rule</strong>, when two functions are <em>multiplied</em>. If <M d="f(x) = u \cdot v"/>, where <M d="u"/> and <M d="v"/> are both functions of <M d="x"/>:</p>
  <M d="(u \cdot v)' = u' \cdot v \;+\; u \cdot v'" block/>
  <p>In words: <em>"derivative of the first times the second, PLUS the first times derivative of the second."</em></p>
  <p>Memory trick: think of it as taking turns. Each function gets a turn being differentiated while the other stays.</p>
  <p><strong>Quotient Rule</strong>, when one function is <em>divided</em> by another. If <M d="f(x) = \dfrac{u}{v}"/>:</p>
  <M d="\left(\frac{u}{v}\right)' = \frac{u' \cdot v \;-\; u \cdot v'}{v^2}" block/>
  <p><strong>Why a minus, not a plus?</strong> Unlike the product rule, the bottom function works <em>against</em> the fraction: when the top is positive (think of revenue or cost, our usual tops), making <M d="v"/> bigger makes <M d="\tfrac{u}{v}"/> smaller. So the term that carries <M d="v"/>'s change pulls the value <em>down</em>, which is why it is subtracted. The "over <M d="v^2"/>" part falls out of the algebra when you rebuild this rule from the product rule, which <Ref to="chain-rule"/> does at its close; for now, treat the squared bottom as part of the pattern.</p>
  <p>Memory trick: <strong>"Low D-High minus High D-Low, over Low squared."</strong> (Low = bottom = <M d="v"/>, High = top = <M d="u"/>, D = derivative of.)</p>
</div>
)},
{type:"example",label:"Product Rule Walkthrough",render:()=>(
<div>
  <p>Differentiate <M d="f(x) = x^2 \cdot e^x"/>.</p>
  <p><strong>Step 1: Identify <M d="u"/> and <M d="v"/>.</strong> <M d="u = x^2"/> (first function), <M d="v = e^x"/> (second function).</p>
  <p><strong>Step 2: Find their derivatives.</strong> <M d="u' = 2x"/> (power rule, <Ref to="power-rule"/>) and <M d="v' = e^x"/> (<Ref to="exp-log-derivatives"/>: <M d="e^x"/> is its own derivative).</p>
  <p><strong>Step 3: Apply <M d="u'v + uv'"/>.</strong></p>
  <M d="f'(x) = (2x)(e^x) + (x^2)(e^x)" block/>
  <p><strong>Step 4: Simplify.</strong> Both terms have <M d="e^x"/>, so factor it out:</p>
  <M d="f'(x) = e^x(2x + x^2) = e^x(x^2 + 2x)" block/>
  <Box color="green">
    <p><M d="f'(x) = e^x(x^2 + 2x)"/></p>
    <p>Compare to the wrong answer, <M d="2x \cdot e^x"/>. The product rule gives us an extra <M d="x^2 e^x"/> term; that is the piece you would miss.</p>
  </Box>
</div>
)},
{type:"example",label:"Quotient Rule Walkthrough",render:()=>(
<div>
  <p>Differentiate <M d="f(x) = \dfrac{x^2 + 1}{3x - 5}"/>.</p>
  <p><strong>Step 1: Identify top and bottom.</strong> <M d="u = x^2 + 1"/> (top), <M d="v = 3x - 5"/> (bottom).</p>
  <p><strong>Step 2: Find their derivatives.</strong> <M d="u' = 2x"/>, <M d="v' = 3"/>.</p>
  <p><strong>Step 3: Apply the formula <M d="\tfrac{u'v - uv'}{v^2}"/>.</strong></p>
  <M d="f'(x) = \frac{(2x)(3x-5) - (x^2+1)(3)}{(3x-5)^2}" block/>
  <p><strong>Step 4: Expand the numerator.</strong></p>
  <p>First piece: <M d="(2x)(3x-5) = 6x^2 - 10x"/>. Second piece: <M d="(x^2+1)(3) = 3x^2 + 3"/>.</p>
  <p>Subtract, and watch the sign: the minus flips <strong>both</strong> terms of the second piece, not just the first:</p>
  <M d="(6x^2 - 10x) - (3x^2 + 3) = 6x^2 - 10x - 3x^2 - 3" block/>
  <p>Now combine like terms (<M d="6x^2 - 3x^2 = 3x^2"/>): <M d="3x^2 - 10x - 3"/>.</p>
  <M d="\boxed{f'(x) = \frac{3x^2 - 10x - 3}{(3x-5)^2}}" block/>
  <Box color="green">
    <p><strong>Tip:</strong> with the quotient rule, do not try to simplify the bottom; leave it as <M d="(3x-5)^2"/>. The top is where you do the algebra.</p>
  </Box>
</div>
)},
{type:"practice",render:()=>(<span>Differentiate <M d="f(x) = x \cdot \ln(x)"/></span>),
answer:()=>(
<div>
  <p><strong>Step 1: Identify <M d="u"/> and <M d="v"/>.</strong> <M d="u = x"/> (first function), <M d="v = \ln(x)"/> (second function).</p>
  <p><strong>Step 2: Find their derivatives.</strong> <M d="u' = 1"/> (power rule: <M d="x^1"/> gives 1) and <M d="v' = \tfrac{1}{x}"/> (derivative of <M d="\ln x"/> from <Ref to="exp-log-derivatives"/>).</p>
  <p><strong>Step 3: Apply the product rule <M d="u'v + uv'"/>.</strong></p>
  <M d="f'(x) = (1) \cdot \ln(x) + (x) \cdot \frac{1}{x}" block/>
  <p><strong>Step 4: Simplify.</strong> First piece: <M d="1 \cdot \ln(x) = \ln(x)"/>. Second piece: <M d="x \cdot \tfrac{1}{x} = \tfrac{x}{x} = 1"/>.</p>
  <M d="\boxed{f'(x) = \ln(x) + 1}" block/>
  <Box color="green">
    <p><M d="f'(x) = \ln(x) + 1"/></p>
    <p><strong>When to use which rule:</strong> functions multiplied, product rule. Functions divided, quotient rule. Next lesson: functions <em>nested inside</em> each other, the chain rule.</p>
  </Box>
</div>
)},
{type:"practice",render:()=>(<span>Differentiate <M d="f(x)=\dfrac{e^x}{x}"/> and find where its slope is zero.</span>),
answer:()=>(
<div>
  <p><strong>Step 1: Identify top and bottom.</strong> <M d="u=e^x"/>, <M d="v=x"/>.</p>
  <p><strong>Step 2: Derivatives.</strong> <M d="u'=e^x"/>, <M d="v'=1"/>.</p>
  <p><strong>Step 3: Quotient rule.</strong></p>
  <M d="f'(x)=\frac{u'v-uv'}{v^2}=\frac{e^x\cdot x-e^x\cdot 1}{x^2}" block/>
  <p><strong>Step 4: Simplify.</strong> Both terms on top contain <M d="e^x"/>, so factor it out:</p>
  <M d="f'(x)=\frac{e^x(x-1)}{x^2}" block/>
  <p><strong>Step 5: Where is the slope zero?</strong> A fraction is zero only when its top is zero. <M d="e^x"/> is never zero (it is always positive, from <Ref to="logarithms"/>), so we need <M d="x-1=0"/>, that is <M d="x=1"/>. For <M d="x"/> just below 1 the top is negative (falling) and just above 1 it is positive (rising), so <M d="x=1"/> is the bottom of a valley: the lowest point of <M d="\tfrac{e^x}{x}"/> for positive <M d="x"/>, with value <M d="\tfrac{e}{1}=e"/>.</p>
  <Box color="green"><p><M d="f'(x)=\dfrac{e^x(x-1)}{x^2}"/>; the slope is zero at <M d="x=1"/>, where the curve bottoms out at height <M d="e"/>. Finding flat spots like this is the whole job of <Ref to="first-derivative-test"/>.</p></Box>
</div>
)},
]},

{slug:"chain-rule",module:"Derivatives",title:"The Chain Rule",time:"12 min",content:[
{type:"concept",label:"Functions Inside Functions",render:()=>(
<div>
  <p>Our derivative toolkit now handles single terms (power rule), <M d="e^x"/> and <M d="\ln(x)"/> (<Ref to="exp-log-derivatives"/>), products (product rule), and quotients (quotient rule). But there is one more situation we have not covered.</p>
  <p>What about <M d="(3x^2 + 1)^4"/>? Or <M d="e^{5x}"/>? Or <M d="\ln(x^2 + 1)"/>?</p>
  <p>These are <strong>functions inside other functions</strong>, also called <strong>compositions</strong>. The power rule says "bring the exponent down," but <M d="(3x^2+1)^4"/> is not just <M d="x^4"/>; there is a whole expression stuffed inside the power.</p>
  <p><strong>The analogy:</strong> think of a wrapped gift. The outside wrapping is one function (raising to the 4th power). The gift inside is another function (<M d="3x^2 + 1"/>). To "unwrap" the derivative, you need to handle both layers.</p>
  <p><strong>But why <em>multiply</em> the two pieces?</strong> Think about speeds. Suppose a car drives twice as fast as a bicycle, and the bicycle moves three times as fast as someone walking. How fast is the car compared to the walker? You multiply: <M d="2\times 3 = 6"/> times walking speed. A derivative is exactly a "how many times as fast" number. The outside function changes <M d="f'(g(x))"/> times as fast as its inside moves, and the inside moves <M d="g'(x)"/> times as fast as <M d="x"/>. Chain those two rates together and they multiply; that is the chain rule. (This is also why you "leave the inside alone" in the outside step: <M d="f'(g(x))"/> means the outside's rate measured at the inside's current value.)</p>
  <Box color="amber">
    <p><strong>The Chain Rule:</strong> "Derivative of the OUTSIDE (leave the inside alone) times derivative of the INSIDE."</p>
    <M d="\frac{d}{dx}[f(g(x))] = f'(g(x)) \cdot g'(x)" block/>
  </Box>
  <p><strong>How to spot when you need it:</strong> if you see a function "plugged into" another function, something raised to a power, <M d="e^{\text{something}}"/>, <M d="\ln(\text{something})"/>, where that "something" is more complicated than just <M d="x"/>, you need the chain rule.</p>
</div>
)},
{type:"rule",label:"Chain Rule Patterns You Will See Most",render:()=>(
<div>
  <p>Here are the three most common chain rule patterns, all following the same logic:</p>
  <Box>
    <p><strong>Power of a function:</strong></p>
    <M d="\frac{d}{dx}[u^n] = n \cdot u^{n-1} \cdot u'" block/>
    <p>"Bring the exponent down, reduce the exponent, multiply by the derivative of the inside."</p>
  </Box>
  <Box>
    <p><strong><M d="e"/> raised to a function:</strong></p>
    <M d="\frac{d}{dx}[e^u] = e^u \cdot u'" block/>
    <p>"<M d="e^u"/> stays (it is its own derivative), multiply by the derivative of the inside."</p>
  </Box>
  <Box>
    <p><strong>ln of a function:</strong></p>
    <M d="\frac{d}{dx}[\ln(u)] = \frac{u'}{u} = \frac{1}{u} \cdot u'" block/>
    <p>"1 over the inside, times the derivative of the inside."</p>
  </Box>
  <p>In every case, the pattern is: <strong>do the outside rule, then multiply by <M d="u'"/></strong>.</p>
  <p><strong>Bonus, other bases:</strong> since <M d="2=e^{\ln 2}"/>, we can write <M d="2^x=e^{(\ln 2)x}"/>, and the <M d="e^u"/> pattern gives <M d="\tfrac{d}{dx}[2^x]=2^x\ln 2\approx 0.693\cdot 2^x"/>. Every exponential is <M d="e"/> in disguise, which is why the course only ever needs <M d="e"/>.</p>
</div>
)},
{type:"example",label:"Chain Rule with a Power",render:()=>(
<div>
  <p>Differentiate <M d="f(x) = (3x^2 + 1)^4"/>.</p>
  <p><strong>Step 1: Identify outside and inside.</strong> Outside function: <M d="(\;\cdot\;)^4"/> (raising to the 4th power). Inside function: <M d="u = 3x^2 + 1"/>.</p>
  <p><strong>Step 2: Differentiate the OUTSIDE, leaving the inside alone.</strong> Power rule on the outside: bring the 4 down, reduce the exponent:</p>
  <M d="4(3x^2 + 1)^3" block/>
  <p>Notice: the inside <M d="(3x^2+1)"/> is untouched; we just applied the power rule to the outer shell.</p>
  <p><strong>Step 3: Multiply by the derivative of the INSIDE.</strong> Inside is <M d="u = 3x^2 + 1"/>. Differentiate it:</p>
  <Box>
    <p><M d="\tfrac{d}{dx}[3x^2] = 6x"/> (bring 2 down: <M d="2 \times 3 = 6"/>)</p>
    <p><M d="\tfrac{d}{dx}[1] = 0"/></p>
    <p>So <M d="u' = 6x"/></p>
  </Box>
  <p><strong>Step 4: Multiply everything together.</strong></p>
  <M d="f'(x) = 4(3x^2+1)^3 \cdot 6x = 24x(3x^2+1)^3" block/>
  <Box color="green">
    <p><M d="f'(x) = 24x(3x^2+1)^3"/></p>
    <p>The number one chain rule mistake: <strong>forgetting the <M d="\cdot 6x"/></strong>. Always ask yourself after finishing: "Did I multiply by the derivative of the inside?"</p>
  </Box>
</div>
)},
{type:"example",label:"Chain Rule with eˣ",render:()=>(
<div>
  <p>Differentiate <M d="f(x) = e^{5x}"/>.</p>
  <p><strong>Step 1:</strong> Outside: <M d="e^{(\cdot)}"/>. Inside: <M d="u = 5x"/>.</p>
  <p><strong>Step 2:</strong> Derivative of the outside (leave the inside alone): <M d="e^{5x}"/> (since <M d="e^u"/> is its own derivative).</p>
  <p><strong>Step 3:</strong> Multiply by the derivative of the inside: <M d="u' = 5"/>.</p>
  <M d="f'(x) = e^{5x} \cdot 5 = 5e^{5x}" block/>
  <p><strong>Shortcut to remember:</strong> <M d="\tfrac{d}{dx}[e^{kx}] = k \cdot e^{kx}"/>. The constant in the exponent comes down as a multiplier.</p>
  <p>This comes up constantly in continuous compounding from <Ref to="exponentials"/>. If <M d="A = Pe^{rt}"/>, then <M d="\tfrac{dA}{dt} = Pr \cdot e^{rt}"/>. Here <M d="P"/> and <M d="r"/> are constants: <M d="P"/> is a constant multiplier, so it rides along untouched, and the inside is <M d="rt"/>, whose derivative with respect to <M d="t"/> is <M d="r"/>. That <M d="r"/> is the "derivative of the inside," so it comes out front. Read it as a business fact: money growing continuously at rate <M d="r"/> grows, at every instant, at <M d="r"/> times its current size.</p>
</div>
)},
{type:"concept",label:"Closing a Loop: Where the Quotient Rule Comes From",render:()=>(
<div>
  <p>In <Ref to="product-quotient"/> we promised to explain the "over <M d="v^2"/>" in the quotient rule. With the chain rule in hand it takes four lines. The trick is to stop thinking of <M d="\tfrac{u}{v}"/> as a division and see it as a product: <M d="\tfrac{u}{v}=u\cdot v^{-1}"/> (negative exponents from <Ref to="exponentials"/>).</p>
  <p><strong>Line 1: product rule</strong> on <M d="u\cdot v^{-1}"/>:</p>
  <M d="(u\cdot v^{-1})'=u'\cdot v^{-1}+u\cdot(v^{-1})'" block/>
  <p><strong>Line 2: chain rule</strong> on <M d="v^{-1}"/> (a power of a function): bring down <M d="-1"/>, reduce the exponent to <M d="-2"/>, multiply by the inside's derivative <M d="v'"/>:</p>
  <M d="(v^{-1})'=-1\cdot v^{-2}\cdot v'=-\frac{v'}{v^2}" block/>
  <p><strong>Line 3: substitute</strong> and write the negative exponent as a fraction:</p>
  <M d="\frac{u'}{v}-\frac{u\,v'}{v^2}" block/>
  <p><strong>Line 4: common denominator.</strong> Multiply the first fraction's top and bottom by <M d="v"/>:</p>
  <M d="\frac{u'v}{v^2}-\frac{uv'}{v^2}=\frac{u'v-uv'}{v^2}" block/>
  <p>That is the quotient rule, minus sign and squared denominator included. Nothing about it needed to be memorized as a separate fact; it is the product rule and the chain rule working together. Whenever a formula in this course looks arbitrary, there is usually a derivation like this behind it.</p>
</div>
)},
{type:"practice",render:()=>(<span>Differentiate <M d="f(x) = \ln(x^2 + 5)"/></span>),
answer:()=>(
<div>
  <p><strong>Step 1: Identify outside and inside.</strong> Outside: <M d="\ln(\;\cdot\;)"/>. Inside: <M d="u = x^2 + 5"/>.</p>
  <p><strong>Step 2: Derivative of the outside (leave the inside alone).</strong> The outside derivative, with the inside left alone: <M d="\tfrac{1}{u} = \tfrac{1}{x^2 + 5}"/>.</p>
  <p><strong>Step 3: Multiply by the derivative of the inside.</strong> <M d="u' = 2x"/> (power rule on <M d="x^2"/>; the 5 vanishes).</p>
  <p><strong>Step 4: Multiply together.</strong></p>
  <M d="f'(x) = \frac{1}{x^2+5} \cdot 2x = \frac{2x}{x^2+5}" block/>
  <Box color="green">
    <p><M d="f'(x) = \dfrac{2x}{x^2+5}"/></p>
    <p><strong>Full toolkit recap:</strong> the power rule (<Ref to="power-rule"/>), then <M d="e^x"/> and <M d="\ln x"/> (<Ref to="exp-log-derivatives"/>), then product and quotient (<Ref to="product-quotient"/>), and now the chain rule. You have every differentiation tool this course needs.</p>
  </Box>
</div>
)},
{type:"practice",render:()=>(<span>Differentiate <M d="f(x)=\sqrt{x^2+9}"/>, then find the slope at <M d="x=4"/>.</span>),
answer:()=>(
<div>
  <p><strong>Step 1: Rewrite the root as a power.</strong> <M d="f(x)=(x^2+9)^{1/2}"/>. Outside: <M d="(\;\cdot\;)^{1/2}"/>. Inside: <M d="u=x^2+9"/>.</p>
  <p><strong>Step 2: Derivative of the outside, inside left alone.</strong> Power rule with exponent <M d="\tfrac12"/>: bring it down, reduce to <M d="-\tfrac12"/>:</p>
  <M d="\tfrac12(x^2+9)^{-1/2}" block/>
  <p><strong>Step 3: Derivative of the inside.</strong> <M d="u'=2x"/>.</p>
  <p><strong>Step 4: Multiply and tidy.</strong> The <M d="\tfrac12"/> and the <M d="2"/> cancel, and the negative exponent becomes a square root in the denominator:</p>
  <M d="f'(x)=\tfrac12(x^2+9)^{-1/2}\cdot 2x=\frac{x}{\sqrt{x^2+9}}" block/>
  <p><strong>Step 5: Slope at <M d="x=4"/>.</strong> <M d="\sqrt{16+9}=\sqrt{25}=5"/>, so <M d="f'(4)=\tfrac{4}{5}=0.8"/>.</p>
  <Box color="green"><p><M d="f'(x)=\dfrac{x}{\sqrt{x^2+9}}"/>, and <M d="f'(4)=0.8"/>. Roots are powers, so the chain rule's power pattern handles them.</p></Box>
</div>
)},
]},

{slug:"implicit-related-rates",module:"Derivatives",title:"Implicit Differentiation & Related Rates",time:"11 min",content:[
{type:"concept",label:"When y Is Not Alone",render:()=>(
<div>
  <p>Every function so far came neatly solved for <M d="y"/>: <M d="y=x^2"/>, <M d="y=e^{5x}"/>. But many relationships arrive tangled up, with <M d="x"/> and <M d="y"/> on the same side. A circle of radius 5 is the classic case:</p>
  <M d="x^2+y^2=25" block/>
  <p>You <em>could</em> solve for <M d="y"/> (the top half is <M d="y=\sqrt{25-x^2}"/>), but for messier equations that is painful or impossible. <strong>Implicit differentiation</strong> finds the slope <M d="\tfrac{dy}{dx}"/> without ever solving for <M d="y"/>.</p>
  <p>The one idea: treat <M d="y"/> as a function of <M d="x"/> that you happen not to have written out, and differentiate both sides of the equation with respect to <M d="x"/>. Whenever you hit a <M d="y"/>, the chain rule from <Ref to="chain-rule"/> kicks in, because <M d="y"/> is an "inside" function. So <M d="y^2"/> is a power of a function: its derivative is <M d="2y"/> (the outside) times <M d="y'"/> (the derivative of the inside).</p>
  <p>Do it for the circle:</p>
  <Box>
    <p><M d="\tfrac{d}{dx}[x^2]=2x"/></p>
    <p><M d="\tfrac{d}{dx}[y^2]=2y\cdot y'"/> (chain rule: <M d="y"/> is the inside)</p>
    <p><M d="\tfrac{d}{dx}[25]=0"/></p>
  </Box>
  <M d="2x+2y\,y'=0\;\Rightarrow\;y'=-\frac{x}{y}" block/>
  <p>At the point <M d="(3,4)"/> (check: <M d="9+16=25"/>, so it is on the circle), the slope is <M d="y'=-\tfrac{3}{4}"/>.</p>
  <p><strong>Does the slow way agree?</strong> Solve for the top half, <M d="y=(25-x^2)^{1/2}"/>, and differentiate with the chain rule: <M d="y'=\tfrac12(25-x^2)^{-1/2}\cdot(-2x)=\tfrac{-x}{\sqrt{25-x^2}}"/>. At <M d="x=3"/>: <M d="\tfrac{-3}{\sqrt{16}}=-\tfrac34"/>. Same answer, with more work. And notice the implicit answer <M d="-\tfrac{x}{y}"/> also covers the bottom half of the circle for free, where the explicit formula would need a separate minus sign.</p>
  <Graph fns={[(x)=>Math.sqrt(25-x*x),(x)=>-Math.sqrt(25-x*x),(x)=>4-0.75*(x-3)]} xMin={-6} xMax={6} yMin={-6} yMax={6}
    highlights={[{x:3,y:4,label:"(3, 4), slope -3/4",color:"#f59e0b",lo:[10,-12]}]}
    caption="The circle x squared plus y squared equals 25 with its tangent at (3, 4). Implicit differentiation found the slope without solving for y."/>
</div>
)},
{type:"concept",label:"A Promise Kept: the Derivative of ln x",render:()=>(
<div>
  <p>In <Ref to="exp-log-derivatives"/> we checked numerically that <M d="\tfrac{d}{dx}[\ln x]=\tfrac1x"/> and promised the real reason later. Here it is, in three lines, because implicit differentiation is exactly the tool for undoing an inverse.</p>
  <p>Let <M d="y=\ln x"/>. By the definition of the logarithm (<Ref to="logarithms"/>), that means</p>
  <M d="e^y=x" block/>
  <p>Differentiate both sides with respect to <M d="x"/>. On the left, <M d="e^y"/> is <M d="e"/> to an inside function, so the chain rule gives <M d="e^y\cdot y'"/>. On the right, the derivative of <M d="x"/> is 1:</p>
  <M d="e^y\,y'=1\;\Rightarrow\;y'=\frac{1}{e^y}" block/>
  <p>But <M d="e^y"/> is just <M d="x"/> (that was the equation we started from). So</p>
  <M d="y'=\frac{1}{x}" block/>
  <p>The slope of <M d="\ln x"/> is <M d="\tfrac1x"/> exactly, not approximately. Every inverse function's derivative can be found this way: write the inverse relationship, differentiate implicitly, substitute back.</p>
</div>
)},
{type:"concept",label:"Everything Changes Over Time",render:()=>(
<div>
  <p>In a real business nothing holds still. Price moves, so demand moves, so revenue moves, all at once. <strong>Related rates</strong> is the same implicit idea with one twist: the hidden variable is <em>time</em>. Every quantity is secretly a function of <M d="t"/>, and differentiating an equation that ties the quantities together produces an equation that ties their <em>rates</em> together.</p>
  <p>Take revenue, <M d="R=p\cdot q"/>. If price and quantity both change over time, then differentiating with respect to <M d="t"/> uses the product rule, and the chain rule on each factor adds a <M d="\tfrac{dp}{dt}"/> or <M d="\tfrac{dq}{dt}"/>:</p>
  <M d="\frac{dR}{dt}=\frac{dp}{dt}\,q+p\,\frac{dq}{dt}" block/>
  <p>Read it in words: revenue rises because the price is rising (first term, times how many you sell) and changes because the quantity is changing (second term, times the price). Given any two of the three rates and the current values, you can find the third.</p>
  <Box>
    <p><strong>The related rates recipe:</strong></p>
    <p>1. Write the equation relating the quantities (before any numbers go in).</p>
    <p>2. Differentiate both sides with respect to <M d="t"/>, attaching a rate to every quantity that changes.</p>
    <p>3. Only now substitute the current values and the known rates.</p>
    <p>4. Solve for the unknown rate and state its units.</p>
  </Box>
  <p>The most common mistake is substituting numbers in step 1. If you replace <M d="p"/> with 30 before differentiating, its rate of change becomes 0 and the term vanishes. Numbers go in last.</p>
</div>
)},
{type:"rule",label:"Implicit Differentiation and Related Rates",render:()=>(
<div>
  <p><strong>Implicit differentiation:</strong> differentiate both sides with respect to <M d="x"/>, using the chain rule on every <M d="y"/>:</p>
  <M d="\frac{d}{dx}[y^n]=n\,y^{n-1}\,y'\qquad\frac{d}{dx}[e^y]=e^y\,y'\qquad\frac{d}{dx}[xy]=y+x\,y'" block/>
  <p>Then gather the <M d="y'"/> terms and solve for <M d="y'"/>.</p>
  <p><strong>Related rates:</strong> relate the quantities, differentiate with respect to <M d="t"/>, substitute values last, solve for the missing rate. For revenue:</p>
  <M d="\frac{dR}{dt}=\frac{dp}{dt}\,q+p\,\frac{dq}{dt}" block/>
</div>
)},
{type:"example",label:"Raising the Price While Revenue Falls",render:()=>(
<div>
  <p>A company sells a product for $30 and plans to raise the price by $1 per month. Its demand is <M d="q=1000-20p"/> units. How fast is revenue changing right now?</p>
  <p><strong>Step 1: The relationship.</strong> <M d="R=p\cdot q"/>, with both <M d="p"/> and <M d="q"/> changing over time.</p>
  <p><strong>Step 2: Differentiate with respect to <M d="t"/>.</strong> Product rule:</p>
  <M d="\frac{dR}{dt}=\frac{dp}{dt}\,q+p\,\frac{dq}{dt}" block/>
  <p>We know <M d="\tfrac{dp}{dt}=1"/> dollar per month, but we need <M d="\tfrac{dq}{dt}"/>. Get it from the demand equation, differentiated with respect to <M d="t"/> (chain rule on <M d="p"/>):</p>
  <M d="q=1000-20p\;\Rightarrow\;\frac{dq}{dt}=-20\,\frac{dp}{dt}=-20(1)=-20\text{ units per month}" block/>
  <p>Each $1 of price rise costs 20 customers a month.</p>
  <p><strong>Step 3: Substitute the current values.</strong> Right now <M d="p=30"/> and <M d="q=1000-20(30)=400"/>:</p>
  <M d="\frac{dR}{dt}=(1)(400)+(30)(-20)=400-600=-200\text{ dollars per month}" block/>
  <p><strong>Step 4: Interpret.</strong> Revenue is <em>falling</em> by $200 a month even though the price is going up. The extra dollar on each of 400 sales adds $400, but losing 20 sales at $30 each costs $600. The price increase is a mistake at this point on the demand curve, and <Ref to="elasticity"/> will show how to see that instantly, without the calculation.</p>
  <Box color="green"><p><M d="\tfrac{dR}{dt}=-200"/> dollars per month. The two terms of the product rule are the two competing effects, and the second wins.</p></Box>
</div>
)},
{type:"practice",render:()=>(<span>Find <M d="y'"/> for the curve <M d="x^2+xy+y^2=7"/> at the point <M d="(1,2)"/>. First confirm the point is on the curve.</span>),
answer:()=>(
<div>
  <p><strong>Step 0: Is <M d="(1,2)"/> on the curve?</strong> <M d="1+2+4=7"/>. Yes.</p>
  <p><strong>Step 1: Differentiate each term with respect to <M d="x"/>.</strong></p>
  <Box>
    <p><M d="x^2"/> gives <M d="2x"/>.</p>
    <p><M d="xy"/> is a product of <M d="x"/> and <M d="y"/>, so use the product rule: <M d="(1)(y)+(x)(y')=y+xy'"/>.</p>
    <p><M d="y^2"/> gives <M d="2y\,y'"/> by the chain rule.</p>
    <p><M d="7"/> gives <M d="0"/>.</p>
  </Box>
  <M d="2x+y+xy'+2yy'=0" block/>
  <p><strong>Step 2: Gather the <M d="y'"/> terms and solve.</strong> Move the terms without <M d="y'"/> to the right, then factor <M d="y'"/> out:</p>
  <M d="y'(x+2y)=-2x-y\;\Rightarrow\;y'=-\frac{2x+y}{x+2y}" block/>
  <p><strong>Step 3: Substitute the point.</strong></p>
  <M d="y'=-\frac{2(1)+2}{1+2(2)}=-\frac{4}{5}" block/>
  <Box color="green"><p>The slope at <M d="(1,2)"/> is <M d="-\tfrac45"/>. Notice the answer needed both coordinates; that is normal for implicit curves, where the slope depends on <em>where</em> you are, not just on <M d="x"/>.</p></Box>
</div>
)},
{type:"practice",render:()=>(<span>The factory from <Ref to="marginal"/> has cost <M d="C(x)=1000+25x-0.05x^2"/>. It is producing 50 items and increasing production at 4 items per day. How fast is its cost rising, in dollars per day?</span>),
answer:()=>(
<div>
  <p><strong>Step 1: The relationship.</strong> <M d="C"/> depends on <M d="x"/>, and <M d="x"/> depends on time. So <M d="C"/> depends on time through <M d="x"/>: a chain.</p>
  <p><strong>Step 2: Differentiate with respect to <M d="t"/>.</strong> Chain rule: the outside rate is <M d="C'(x)"/> (dollars per item) and the inside rate is <M d="\tfrac{dx}{dt}"/> (items per day):</p>
  <M d="\frac{dC}{dt}=C'(x)\cdot\frac{dx}{dt}" block/>
  <p>Check the units: dollars per item times items per day gives dollars per day. The items cancel, exactly as they should.</p>
  <p><strong>Step 3: Substitute.</strong> From <Ref to="marginal"/>, <M d="C'(x)=25-0.1x"/>, so <M d="C'(50)=20"/> dollars per item. And <M d="\tfrac{dx}{dt}=4"/> items per day:</p>
  <M d="\frac{dC}{dt}=20\times 4=80\text{ dollars per day}" block/>
  <Box color="green"><p>Cost is rising at $80 per day. Marginal cost (per item) times production speed (items per day) is cost speed (dollars per day). Related rates is the chain rule with time on the inside.</p></Box>
</div>
)},
]},

{slug:"elasticity",module:"Derivatives",title:"Elasticity of Demand",time:"11 min",content:[
{type:"concept",label:"The Pricing Question",render:()=>(
<div>
  <p>This lesson ties together everything from the Derivatives module into a powerful business concept.</p>
  <p><strong>The business question:</strong> "If I raise my price by 1%, how much will my sales drop?" This is called <strong>elasticity of demand</strong>: it measures how <em>sensitive</em> customers are to price changes.</p>
  <p><strong>Why it matters:</strong> suppose you sell widgets at $30 each and move 400 units. You are thinking about raising the price to $31. Will you make more money or less? It depends on how many customers you lose.</p>
  <p>If customers barely notice the price hike (say demand drops from 400 to 395), the extra revenue per unit more than compensates: <strong>raise the price</strong>.</p>
  <p>If customers flee (demand drops from 400 to 350), you lose too many sales: <strong>lower the price</strong>.</p>
  <p>Elasticity puts a number on this trade-off. (In <Ref to="implicit-related-rates"/> we watched exactly this company lose $200 a month of revenue by raising its price; by the end of this lesson you will be able to predict that from a single number.)</p>
</div>
)},
{type:"rule",label:"The Elasticity Formula",render:()=>(
<div>
  <p>If demand as a function of price is <M d="q = f(p)"/>, then elasticity at price <M d="p"/> is:</p>
  <M d="E(p) = -\frac{p \cdot f'(p)}{f(p)}" block/>
  <p><strong>Where does this come from?</strong> Elasticity is just the question from the last section written as a fraction: percent change in demand divided by percent change in price. A percent change in demand is <M d="\tfrac{\Delta q}{q}"/>, and a percent change in price is <M d="\tfrac{\Delta p}{p}"/>. Divide one by the other and rearrange:</p>
  <M d="\frac{\Delta q / q}{\Delta p / p} = \frac{p}{q}\cdot\frac{\Delta q}{\Delta p}" block/>
  <p>The piece <M d="\tfrac{\Delta q}{\Delta p}"/> is just how fast demand changes as price changes, which for a tiny price change is <M d="f'(p)"/>. And <M d="q"/> is <M d="f(p)"/>. So the ratio becomes <M d="\tfrac{p\,f'(p)}{f(p)}"/>. The minus sign out front is added for one reason only, explained below.</p>
  <Box>
    <p><M d="f(p)"/> = the current demand (how many units you sell at price <M d="p"/>)</p>
    <p><M d="f'(p)"/> = the derivative of demand: how fast demand is changing with respect to price (this is where your derivative skills from Lessons <Ref to="power-rule" bare/> to <Ref to="chain-rule" bare/> come in)</p>
    <p><M d="p"/> = the current price</p>
    <p>The negative sign makes <M d="E"/> positive, since <M d="f'(p)"/> is typically negative (higher price means less demand).</p>
  </Box>
  <p><strong>How to interpret <M d="E"/>:</strong></p>
  <Box>
    <p><M d="E > 1"/>, <strong>elastic</strong>: customers are price-sensitive. A 1% price increase causes more than a 1% drop in demand. <strong>Lower your price</strong> to increase revenue. Why lower it? Revenue is price times quantity. If a 1% price rise throws away <em>more</em> than 1% of your customers, the shrinking quantity outweighs the bigger tag, so revenue falls; cutting the price 1% instead wins back more than 1% in sales, so revenue rises.</p>
  </Box>
  <Box>
    <p><M d="E < 1"/>, <strong>inelastic</strong>: customers are not very sensitive. A 1% price increase causes less than a 1% drop in demand. <strong>Raise your price</strong> to increase revenue. Why raise it? A 1% price rise costs you <em>less</em> than 1% of customers, so the higher tag outweighs the few lost sales and revenue climbs.</p>
  </Box>
  <Box>
    <p><M d="E = 1"/>, <strong>unit elastic</strong>: you are at the sweet spot. <strong>Revenue is maximized</strong> right here. Why the peak? At <M d="E=1"/> a 1% price change is exactly cancelled by a 1% quantity change, so revenue does not move in either direction. The next section proves it.</p>
  </Box>
</div>
)},
{type:"concept",label:"Why E = 1 Is the Top of the Revenue Hill",render:()=>(
<div>
  <p>The interpretations above can be proved in three lines with the product rule. Revenue as a function of price is <M d="R(p)=p\cdot f(p)"/>: price times the quantity sold at that price. Differentiate with respect to <M d="p"/> (<Ref to="product-quotient"/>):</p>
  <M d="R'(p)=1\cdot f(p)+p\cdot f'(p)=f(p)+p\,f'(p)" block/>
  <p>Now factor <M d="f(p)"/> out of both terms:</p>
  <M d="R'(p)=f(p)\left(1+\frac{p\,f'(p)}{f(p)}\right)=f(p)\,(1-E)" block/>
  <p>(The fraction inside the bracket is <M d="-E"/> by the definition of elasticity, so <M d="1+(-E)=1-E"/>.) Since demand <M d="f(p)"/> is positive, the sign of <M d="R'(p)"/> is the sign of <M d="1-E"/>:</p>
  <Box>
    <p><M d="E<1"/>: <M d="1-E>0"/>, so <M d="R'(p)>0"/>. Revenue rises as price rises. Raise it.</p>
    <p><M d="E>1"/>: <M d="1-E<0"/>, so <M d="R'(p)<0"/>. Revenue falls as price rises. Lower it.</p>
    <p><M d="E=1"/>: <M d="R'(p)=0"/>. Revenue is flat, at its peak.</p>
  </Box>
  <p>Check it against <Ref to="implicit-related-rates"/>, where at <M d="p=30"/> we had <M d="f(30)=400"/> and (as the next example shows) <M d="E=1.5"/>: the formula gives <M d="R'(30)=400(1-1.5)=-200"/> dollars per dollar of price. Raising the price $1 per month therefore drains revenue at $200 per month, exactly the related-rates answer. Two lessons, two methods, one number.</p>
</div>
)},
{type:"example",label:"Full Walkthrough",render:()=>(
<div>
  <p><em>"Demand for a product is <M d="q = 1000 - 20p"/>. Find the elasticity at <M d="p = 30"/> and decide: should the company raise or lower prices?"</em></p>
  <p><strong>Step 1: Find <M d="f'(p)"/>.</strong> <M d="f(p) = 1000 - 20p"/>. Differentiate with respect to <M d="p"/>:</p>
  <Box>
    <p><M d="1000"/> is a constant, giving 0.</p>
    <p><M d="-20p = -20p^1"/>: bring 1 down, giving <M d="-20"/>.</p>
  </Box>
  <M d="f'(p) = -20" block/>
  <p>(The derivative is constant here: demand drops by exactly 20 units for every $1 price increase, regardless of price level.)</p>
  <p><strong>Step 2: Find <M d="f(30)"/>, the current demand.</strong></p>
  <M d="f(30) = 1000 - 20(30) = 1000 - 600 = 400\text{ units}" block/>
  <p><strong>Step 3: Plug into the elasticity formula.</strong></p>
  <M d="E(30) = -\frac{(30)(-20)}{400} = -\frac{-600}{400} = \frac{600}{400} = 1.5" block/>
  <p><strong>Step 4: Interpret.</strong></p>
  <Box color="green">
    <p><M d="E = 1.5 > 1"/>: <strong>elastic</strong>.</p>
    <p>A 1% price increase causes a <strong>1.5% drop</strong> in demand. The lost sales hurt more than the higher price helps.</p>
    <p><strong>Recommendation: lower the price</strong> to increase total revenue.</p>
  </Box>
</div>
)},
{type:"practice",render:()=>(<span>Demand is <M d="q = 500 - 0.5p^2"/>. Find <M d="E(20)"/> and interpret. Should prices go up or down?</span>),
answer:()=>(
<div>
  <p><strong>Step 1: Find <M d="f'(p)"/>.</strong> <M d="f(p) = 500 - 0.5p^2"/>. Differentiate:</p>
  <Box>
    <p><M d="500"/> gives 0.</p>
    <p><M d="-0.5p^2"/>: bring 2 down, <M d="2 \times (-0.5) = -1"/>, exponent <M d="2-1=1"/>, giving <M d="-p"/>.</p>
  </Box>
  <M d="f'(p) = -p" block/>
  <p><strong>Step 2: Find <M d="f(20)"/>.</strong></p>
  <M d="f(20) = 500 - 0.5(20^2) = 500 - 0.5(400) = 500 - 200 = 300\text{ units}" block/>
  <p>Because <M d="f'(p) = -p"/> now depends on price, first evaluate it at <M d="p = 20"/>: <M d="f'(20) = -20"/>. (In the linear example <M d="f'"/> was a constant, so this step was hidden; here it matters.)</p>
  <p><strong>Step 3: Plug in.</strong></p>
  <M d="E(20) = -\frac{(20)(-20)}{300} = -\frac{-400}{300} = \frac{400}{300} \approx 1.33" block/>
  <p><strong>Step 4: Interpret.</strong></p>
  <Box color="green">
    <p><M d="E \approx 1.33 > 1"/>: <strong>elastic</strong>. A 1% price hike loses about 1.33% of demand.</p>
    <p><strong>Lower the price</strong> to boost revenue.</p>
    <p><strong>Notice:</strong> the derivative <M d="f'(p) = -p"/> depends on <M d="p"/> here (unlike the linear example, where it was constant). This means elasticity changes as price changes: a product can be elastic at high prices and inelastic at low prices.</p>
  </Box>
</div>
)},
{type:"practice",render:()=>(<span>For the demand <M d="q=1000-20p"/> from the worked example, find the price at which demand is unit elastic (<M d="E=1"/>), and the revenue there. Then confirm it is the revenue peak using <Ref to="quadratics"/>.</span>),
answer:()=>(
<div>
  <p><strong>Step 1: Write <M d="E"/> as a function of <M d="p"/>.</strong> With <M d="f(p)=1000-20p"/> and <M d="f'(p)=-20"/>:</p>
  <M d="E(p)=-\frac{p(-20)}{1000-20p}=\frac{20p}{1000-20p}" block/>
  <p><strong>Step 2: Set <M d="E=1"/> and solve.</strong></p>
  <M d="\frac{20p}{1000-20p}=1\;\Rightarrow\;20p=1000-20p\;\Rightarrow\;40p=1000\;\Rightarrow\;p=25" block/>
  <p><strong>Step 3: Revenue at that price.</strong> Demand is <M d="f(25)=1000-500=500"/> units, so</p>
  <M d="R(25)=25\times 500=\$12{,}500" block/>
  <p><strong>Step 4: Confirm it is the peak.</strong> Revenue as a function of price is <M d="R(p)=p(1000-20p)=1000p-20p^2"/>, a downward parabola. Its vertex (<Ref to="quadratics"/>) is at <M d="p=-\tfrac{1000}{2(-20)}=25"/>. Same price. Unit elasticity and the vertex of the revenue parabola are the same point, seen two ways.</p>
  <p>Consistency check with the worked example: at <M d="p=30"/> we found <M d="E=1.5>1"/> and advised lowering the price. Lowering it from 30 toward 25 is exactly the move toward the revenue peak.</p>
  <Box color="green"><p>Unit elastic at <M d="p=\$25"/>, where revenue peaks at $12,500.</p></Box>
</div>
)},
]},

{slug:"first-derivative-test",module:"Applications of Derivatives",title:"First Derivative Test",time:"11 min",content:[
{type:"concept",label:"Peaks, Valleys, and Flat Spots",render:()=>(
<div>
  <p>This is where derivatives start paying off. The derivative <M d="f'(x)"/> is the <strong>slope</strong> at every point, and the slope tells you whether the function is climbing or falling. That lets you find the <strong>peaks and valleys</strong> of any curve.</p>
  <p>Picture a hike up a hill and back down. While you climb, your path slopes upward (positive slope). At the very top, for one instant, the ground is flat (slope 0). On the way down, the path slopes downward (negative slope).</p>
  <p>So the top of the hill, the maximum, is exactly where the slope <strong>switches from positive to negative</strong>. A valley bottom (minimum) is where the slope switches from negative to positive.</p>
  <Box>
    <p><strong>Critical number:</strong> an <M d="x"/>-value in the domain of <M d="f"/> where <M d="f'(x)=0"/> (a flat spot) or where <M d="f'(x)"/> does not exist. These are the only places a peak or valley can hide. (The "in the domain" part matters: <M d="\tfrac{1}{x}"/> has no derivative at <M d="x=0"/>, but <M d="x=0"/> is not in its domain at all, so it is not a critical number; there is simply no point there.)</p>
    <p>What does "<M d="f'(x)"/> does not exist" mean? It means the curve has no single, clear slope at that <M d="x"/>. The usual cause is a sharp corner, like the pointed bottom of the V in <Ref to="tangent-lines"/>: walk into the point from the left heading downhill, leave it on the right heading uphill, and right at the tip the curve cannot settle on one slope. Yet the tip is still a genuine valley, which is why corner points join the flat spots on the suspect list.</p>
  </Box>
  <Graph fn={(x)=>x*x*x-3*x+2} xMin={-3} xMax={3} yMin={-2} yMax={6}
    highlights={[{x:-1,y:4,label:"flat top, a peak",color:"#ef4444",lo:[-30,-10]},{x:1,y:0,label:"flat bottom, a valley",color:"#10b981",lo:[8,16]}]}
    caption="At the peak and the valley, the curve is momentarily flat (slope = 0)"/>
</div>
)},
{type:"rule",label:"The First Derivative Test",render:()=>(
<div>
  <p><M d="f'(x)>0"/> means <M d="f"/> is increasing. <M d="f'(x)<0"/> means decreasing. <M d="f'(x)=0"/> (or <M d="f'(x)"/> undefined) marks a critical number, the only kind of spot where a peak or valley can sit.</p>
  <p>A quick word on "local": it means highest or lowest compared with the points right next to it, not necessarily on the whole graph. Walk left to right across each critical number and watch the sign of <M d="f'"/>:</p>
  <Box>
    <p><span style={{color:"#4ade80",fontWeight:700}}>positive</span> then <span style={{color:"#f87171",fontWeight:700}}>negative</span> means a local <strong>MAX</strong> (up, then down: a peak).</p>
    <p><span style={{color:"#f87171",fontWeight:700}}>negative</span> then <span style={{color:"#4ade80",fontWeight:700}}>positive</span> means a local <strong>MIN</strong> (down, then up: a valley).</p>
    <p>No sign change means it is not a peak or valley, just a flat pause. (You will meet a real flat pause in the second practice problem, and another in <Ref to="concavity"/>.)</p>
  </Box>
</div>
)},
{type:"example",label:"The 4-Step Recipe",render:()=>(
<div>
  <p>Find and classify the critical numbers of <M d="f(x)=x^2-6x+5"/>.</p>
  <p><strong>Step 1: Take the derivative.</strong> Using the power rule:</p>
  <M d="f'(x)=2x-6" block/>
  <p><strong>Step 2: Set it equal to 0 and solve. These are the critical numbers.</strong></p>
  <M d="2x-6=0\;\Rightarrow\;x=3" block/>
  <p><strong>Step 3: Build a sign chart.</strong> Test one point on each side of <M d="x=3"/>:</p>
  <Box>
    <p><M d="x=0"/>: <M d="f'(0)=2(0)-6=-6"/>, which is <span style={{color:"#f87171",fontWeight:700}}>negative</span> (falling)</p>
    <p><M d="x=4"/>: <M d="f'(4)=2(4)-6=2"/>, which is <span style={{color:"#4ade80",fontWeight:700}}>positive</span> (rising)</p>
  </Box>
  <p>Why does one test point settle the whole stretch? Between two neighboring critical numbers the slope never passes through 0; those zero-crossings <em>are</em> the critical numbers, and we already found them all. A slope that never touches 0 cannot flip from positive to negative without crossing it, so its sign stays the same across the entire interval. That is why checking a single convenient point (here <M d="x=0"/>) stands in for every <M d="x"/> in the stretch.</p>
  <SignChart intervals={[{sign:"-"},{sign:"+"}]} criticals={["3"]}/>
  <p><strong>Step 4: Read the switch.</strong> The slope goes negative then positive, so <M d="x=3"/> is a local <strong>MIN</strong>. Its value is <M d="f(3)=9-18+5=-4"/>.</p>
  <Box color="green"><p>Local minimum of <M d="-4"/> at <M d="x=3"/>. That is the bottom of a parabola, exactly as expected, and exactly the vertex <Ref to="quadratics"/> would have given. The first derivative test finds vertices without a vertex formula, and it works on curves that are not parabolas at all.</p></Box>
</div>
)},
{type:"interactive",render:()=>(<SlopeExplorer fn={(x)=>x*x*x-3*x+2} dfn={(x)=>3*x*x-3} xMin={-3} xMax={3} yMin={-2} yMax={6} start={-2.1}
  intro="Drag along this curve and watch the tangent. The slope is positive, flattens to zero at the peak, turns negative, flattens again at the valley, then turns positive. Those flat spots are the critical numbers you are about to find with algebra."/>)},
{type:"practice",render:()=>(<span>Find and classify the critical numbers of <M d="f(x)=x^3-12x"/>.</span>),
answer:()=>(<div>
  <p><strong>Step 1: Find <M d="f'(x)"/>.</strong></p>
  <Box><p><M d="x^3"/>: bring 3 down, giving <M d="3x^{3-1}=3x^2"/></p><p><M d="-12x"/>: this is <M d="-12x^1"/>, giving <M d="-12(1)x^0=-12"/></p></Box>
  <M d="f'(x)=3x^2-12" block/>
  <p><strong>Step 2: Set equal to 0.</strong> Factor out the 3, then use the difference of squares from <Ref to="quadratics"/> (<M d="x^2-4=(x-2)(x+2)"/>):</p>
  <M d="3(x^2-4)=3(x-2)(x+2)=0\;\Rightarrow\;x=2,\;x=-2" block/>
  <p><strong>Step 3: Sign chart.</strong> Test a point to the left, between, and right of the critical numbers:</p>
  <Box><p><M d="x=-3"/>: <M d="3(9)-12=15"/>, positive</p><p><M d="x=0"/>: <M d="0-12=-12"/>, negative</p><p><M d="x=3"/>: <M d="3(9)-12=15"/>, positive</p></Box>
  <SignChart intervals={[{sign:"+"},{sign:"-"},{sign:"+"}]} criticals={["-2","2"]}/>
  <p>At <M d="x=-2"/>: positive then negative, so a <strong>MAX</strong>. <M d="f(-2)=-8+24=16"/>.</p>
  <p>At <M d="x=2"/>: negative then positive, so a <strong>MIN</strong>. <M d="f(2)=8-24=-16"/>.</p>
  <Graph fn={(x)=>x*x*x-12*x} xMin={-4} xMax={4} yMin={-20} yMax={20} highlights={[{x:-2,y:16,label:"MAX",color:"#ef4444",lo:[8,-10]},{x:2,y:-16,label:"MIN",color:"#10b981",lo:[8,16]}]}/>
  <Box color="green"><p>Local max = 16 at <M d="x=-2"/>. Local min = <M d="-16"/> at <M d="x=2"/>.</p></Box>
</div>)},
{type:"practice",render:()=>(<span>Find and classify the critical numbers of <M d="f(x)=x^4-4x^3"/>. One of them is a trap.</span>),
answer:()=>(<div>
  <p><strong>Step 1: Derivative.</strong> <M d="f'(x)=4x^3-12x^2"/>.</p>
  <p><strong>Step 2: Set to 0.</strong> Pull out the common factor <M d="4x^2"/> (<Ref to="quadratics"/>):</p>
  <M d="4x^2(x-3)=0\;\Rightarrow\;x=0\;\text{ or }\;x=3" block/>
  <p>Two critical numbers, 0 and 3.</p>
  <p><strong>Step 3: Sign chart.</strong> Three stretches, so three test points:</p>
  <Box>
    <p><M d="x=-1"/>: <M d="4(-1)^2(-1-3)=4(1)(-4)=-16"/>, negative</p>
    <p><M d="x=1"/>: <M d="4(1)(1-3)=-8"/>, negative</p>
    <p><M d="x=4"/>: <M d="4(16)(4-3)=64"/>, positive</p>
  </Box>
  <SignChart intervals={[{sign:"-"},{sign:"-"},{sign:"+"}]} criticals={["0","3"]}/>
  <p><strong>Step 4: Read the switches.</strong> At <M d="x=0"/> the slope is negative on both sides: <strong>no sign change</strong>. The curve flattens for an instant and then keeps falling. That is the trap: <M d="x=0"/> is a critical number but <em>not</em> a peak or a valley, just a flat pause. At <M d="x=3"/> the slope goes negative then positive, so it is a local <strong>MIN</strong>, with <M d="f(3)=81-108=-27"/>.</p>
  <p>Why did 0 fool us? Look at the factor <M d="4x^2"/>: it is a square, so it is never negative, and it touches zero at <M d="x=0"/> without crossing. Only the factor <M d="(x-3)"/> actually changes sign. A repeated factor in <M d="f'"/> is the usual fingerprint of a flat pause.</p>
  <Graph fn={(x)=>x*x*x*x-4*x*x*x} xMin={-1.5} xMax={4.5} yMin={-30} yMax={12} highlights={[{x:0,y:0,label:"flat pause, not a peak",color:"#f59e0b",lo:[8,-10]},{x:3,y:-27,label:"MIN",color:"#10b981",lo:[10,4]}]} caption="The curve flattens at x = 0 but keeps descending; the only true extremum is the valley at x = 3."/>
  <Box color="green"><p>Local min of <M d="-27"/> at <M d="x=3"/>. The critical number <M d="x=0"/> is a flat pause, not an extremum. Setting <M d="f'=0"/> finds the <em>suspects</em>; the sign chart is the trial.</p></Box>
</div>)},
]},

{slug:"concavity",module:"Applications of Derivatives",title:"Second Derivative & Concavity",time:"11 min",content:[
{type:"concept",label:"How a Curve Bends",render:()=>(
<div>
  <p>The first derivative told you whether a curve goes up or down. The <strong>second derivative</strong> <M d="f''(x)"/> (the derivative of the derivative, read "f double prime") tells you how the curve <em>bends</em>. This is called <strong>concavity</strong>. In the other notation it is written <M d="\tfrac{d^2y}{dx^2}"/>, "dee two y dee x squared," which just means "differentiate twice."</p>
  <p>Here is <em>why</em> the sign of <M d="f''"/> tells you the bend, not just a trick to memorize. <M d="f''"/> is the derivative of <M d="f'"/>, and <Ref to="first-derivative-test"/> taught us that when a derivative is positive, the thing it measures is <em>increasing</em>. So <M d="f''(x)>0"/> means the slope <M d="f'"/> is increasing. Picture walking left to right through the bottom of a bowl: the slope starts steeply negative (falling hard), eases up to 0 at the very bottom, then grows steeply positive (rising hard). The slope climbs the whole way, and that steady rise in the slope is exactly what curls the curve upward into a bowl. <M d="f''(x)<0"/> is the mirror image: the slope is dropping (from positive, through 0, to negative), which arches the curve over into a dome.</p>
  <p>Two quick ways to remember it:</p>
  <Box>
    <p><strong>Concave UP</strong> (<M d="f''(x)>0"/>): the curve holds water like a bowl or a smile. The slope is increasing.</p>
    <p><strong>Concave DOWN</strong> (<M d="f''(x)<0"/>): the curve spills water like a dome or a frown. The slope is decreasing.</p>
  </Box>
  <p>Why business people care: concavity is the difference between "growing faster and faster" and "growing but slowing down." A profit curve that is concave down is losing momentum even while still rising. And in <Ref to="tangent-lines"/> you saw that a tangent estimate on the square root curve overshot; that is concavity too. A concave-down curve sits below its tangents, so tangent estimates run high; a concave-up curve sits above them, so estimates run low.</p>
  <p>A point where concavity flips (from bowl to dome or back) is an <strong>inflection point</strong>. To find one, first solve <M d="f''(x)=0"/> (or find where <M d="f''"/> does not exist) to get the <em>candidates</em>, then confirm the bend really does switch sign on the two sides. Getting <M d="f''=0"/> alone is not enough: for <M d="f(x)=x^4"/> we get <M d="f''(0)=0"/>, yet the curve is a bowl on both sides of 0, so that point is not an inflection point.</p>
  <Graph fns={[(x)=>x*x,(x)=>-x*x]} xMin={-3} xMax={3} yMin={-6} yMax={6}
    label={<><span style={{color:"#818cf8"}}>Concave up</span> <span style={{color:"#e2e8f0"}}>vs</span> <span style={{color:"#f472b6"}}>concave down</span></>}
    caption="Blue (bowl) is concave up. Pink (dome) is concave down."/>
</div>
)},
{type:"rule",label:"The Second Derivative Test",render:()=>(
<div>
  <p>This gives a faster way to classify a critical number than the sign chart. Once you have a critical number <M d="c"/> where <M d="f'(c)=0"/>, check the bend there:</p>
  <Box>
    <p>If <M d="f''(c)>0"/> (bowl) then <M d="c"/> is a local <strong>MIN</strong>.</p>
    <p>If <M d="f''(c)<0"/> (dome) then <M d="c"/> is a local <strong>MAX</strong>.</p>
    <p>If <M d="f''(c)=0"/> the bend is too flat to tell a peak from a valley from a pause, so this shortcut gives no answer. When that happens, fall back to the first derivative sign chart from <Ref to="first-derivative-test"/>.</p>
  </Box>
  <p>Intuition: at the bottom of a bowl you are at a minimum; at the top of a dome you are at a maximum.</p>
  <p><strong>Inflection points:</strong> candidates where <M d="f''(x)=0"/> or does not exist; confirmed only if <M d="f''"/> changes sign there.</p>
</div>
)},
{type:"example",label:"The Second Derivative Test in Action",render:()=>(
<div>
  <p>Classify the critical number of <M d="f(x)=x^2-4x"/>.</p>
  <p><strong>Step 1: Find the critical number.</strong> <M d="f'(x)=2x-4=0\;\Rightarrow\;x=2"/>.</p>
  <p><strong>Step 2: Take the second derivative.</strong> <M d="f''(x)=2"/>.</p>
  <p><strong>Step 3: Check the bend there.</strong> <M d="f''(2)=2>0"/>, which is a bowl, so <M d="x=2"/> is a local <strong>MIN</strong>.</p>
  <Box color="green"><p>One quick plug-in classified it, with no sign chart needed. That is the whole appeal of the Second Derivative Test. (It is the bottom of an upward parabola, exactly as expected.)</p></Box>
</div>
)},
{type:"example",label:"Finding an Inflection Point",render:()=>(
<div>
  <p>Where does <M d="f(x)=x^3"/> change concavity?</p>
  <p><strong>Step 1:</strong> First derivative: <M d="f'(x)=3x^2"/>.</p>
  <p><strong>Step 2:</strong> Second derivative: <M d="f''(x)=6x"/>.</p>
  <p><strong>Step 3:</strong> Set <M d="f''(x)=0"/>: <M d="6x=0"/>, so <M d="x=0"/>.</p>
  <p><strong>Step 4:</strong> Check each side. For <M d="x<0"/>, <M d="f''"/> is negative (dome). For <M d="x>0"/>, <M d="f''"/> is positive (bowl). The bend flips, so <M d="x=0"/> is an inflection point.</p>
  <p>Notice also that <M d="f'(0)=0"/>, so 0 is a critical number, yet the second derivative test gives <M d="f''(0)=0"/>: no verdict. The sign chart settles it: <M d="f'(x)=3x^2"/> is positive on both sides, so there is no sign change. <M d="x^3"/> has a flat pause at the origin, the same pattern as the trap in <Ref to="first-derivative-test"/>.</p>
  <Box color="green"><p>Inflection point at <M d="(0,0)"/>: the curve switches from concave down to concave up there.</p></Box>
</div>
)},
{type:"concept",label:"Putting It Together: Sketching a Curve",render:()=>(
<div>
  <p>With <M d="f'"/> and <M d="f''"/> you can sketch a curve accurately without plotting dozens of points. The first derivative locates the peaks and valleys; the second locates where the bending changes. Take <M d="f(x)=x^3-3x^2"/>.</p>
  <p><strong>Critical numbers.</strong> <M d="f'(x)=3x^2-6x=3x(x-2)"/>, zero at <M d="x=0"/> and <M d="x=2"/>.</p>
  <p><strong>Classify them.</strong> <M d="f''(x)=6x-6"/>. At 0: <M d="f''(0)=-6<0"/>, a dome, so a local <strong>max</strong> with <M d="f(0)=0"/>. At 2: <M d="f''(2)=6>0"/>, a bowl, so a local <strong>min</strong> with <M d="f(2)=8-12=-4"/>.</p>
  <p><strong>Inflection.</strong> <M d="f''(x)=0"/> at <M d="x=1"/>; negative to the left, positive to the right, so the bend flips there, at height <M d="f(1)=1-3=-2"/>.</p>
  <p>Now assemble the story in a table, reading left to right:</p>
  <Box>
    <p><M d="x<0"/>: rising (<M d="f'>0"/>), concave down (<M d="f''<0"/>). Climbing toward a rounded peak.</p>
    <p><M d="x=0"/>: local max, height 0.</p>
    <p><M d="0<x<1"/>: falling, concave down. Dropping away from the peak, steepening.</p>
    <p><M d="x=1"/>: inflection point, height <M d="-2"/>. Steepest descent; the bend flips.</p>
    <p><M d="1<x<2"/>: falling, concave up. Still dropping, but easing off toward a rounded valley.</p>
    <p><M d="x=2"/>: local min, height <M d="-4"/>.</p>
    <p><M d="x>2"/>: rising, concave up. Climbing faster and faster.</p>
  </Box>
  <Graph fn={(x)=>x*x*x-3*x*x} xMin={-1.5} xMax={3.5} yMin={-6} yMax={4}
    highlights={[{x:0,y:0,label:"max (0, 0)",color:"#ef4444",lo:[-60,-10]},{x:1,y:-2,label:"inflection (1, -2)",color:"#f59e0b",lo:[10,4]},{x:2,y:-4,label:"min (2, -4)",color:"#10b981",lo:[10,14]}]}
    caption="Three numbers from two derivatives pin down the whole shape: a peak at 0, the bend flipping at 1, a valley at 2."/>
  <p>For a business curve, the inflection point is often the most interesting spot of all: it is where growth stops accelerating and starts decelerating, the moment a product's sales are still rising but the rise has begun to slow.</p>
</div>
)},
{type:"practice",render:()=>(<span><M d="f(x)=2x^3-9x^2+12x"/>. Classify the critical numbers using the Second Derivative Test.</span>),
answer:()=>(<div>
  <p><strong>Step 1: First derivative, set to 0.</strong></p>
  <M d="f'(x)=6x^2-18x+12" block/>
  <p>Divide by 6: <M d="x^2-3x+2=(x-1)(x-2)=0"/>, so the critical numbers are <M d="x=1"/> and <M d="x=2"/>.</p>
  <p><strong>Step 2: Second derivative.</strong></p>
  <M d="f''(x)=12x-18" block/>
  <p><strong>Step 3: Plug each critical number into <M d="f''"/>.</strong></p>
  <Box><p><M d="f''(1)=12(1)-18=-6"/>, negative (dome), so a <strong>MAX</strong>. <M d="f(1)=5"/>.</p><p><M d="f''(2)=12(2)-18=6"/>, positive (bowl), so a <strong>MIN</strong>. <M d="f(2)=4"/>.</p></Box>
  <Graph fn={(x)=>2*x*x*x-9*x*x+12*x} xMin={-0.5} xMax={3.5} yMin={-1} yMax={7} highlights={[{x:1,y:5,label:"MAX",color:"#ef4444",lo:[-35,-14]},{x:2,y:4,label:"MIN",color:"#10b981",lo:[10,-14]}]}/>
  <Box color="green"><p>Local max = 5 at <M d="x=1"/>. Local min = 4 at <M d="x=2"/>. The test reads the bend directly, no sign chart needed.</p></Box>
</div>)},
{type:"practice",render:()=>(<span>For <M d="f(x)=x^3-6x^2+9x+1"/>, find and classify the critical numbers, find the inflection point, and state where the curve is concave up and concave down.</span>),
answer:()=>(<div>
  <p><strong>Step 1: Critical numbers.</strong> <M d="f'(x)=3x^2-12x+9=3(x^2-4x+3)=3(x-1)(x-3)"/>, so <M d="x=1"/> and <M d="x=3"/>.</p>
  <p><strong>Step 2: Second derivative.</strong> <M d="f''(x)=6x-12"/>.</p>
  <p><strong>Step 3: Classify.</strong></p>
  <Box>
    <p><M d="f''(1)=6-12=-6<0"/>: dome, local <strong>MAX</strong>. Height <M d="f(1)=1-6+9+1=5"/>.</p>
    <p><M d="f''(3)=18-12=6>0"/>: bowl, local <strong>MIN</strong>. Height <M d="f(3)=27-54+27+1=1"/>.</p>
  </Box>
  <p><strong>Step 4: Inflection.</strong> <M d="6x-12=0"/> at <M d="x=2"/>. For <M d="x<2"/>, <M d="f''<0"/> (concave down); for <M d="x>2"/>, <M d="f''>0"/> (concave up). The bend flips, so <M d="(2,\,f(2))=(2,\,3)"/> is the inflection point (<M d="f(2)=8-24+18+1=3"/>).</p>
  <p>Sanity check: the inflection point sits exactly halfway between the max at <M d="x=1"/> and the min at <M d="x=3"/>, and its height 3 is halfway between 5 and 1. For any cubic, the inflection point is the center of symmetry, so this is no coincidence.</p>
  <Graph fn={(x)=>x*x*x-6*x*x+9*x+1} xMin={-0.5} xMax={4.5} yMin={-1} yMax={7} highlights={[{x:1,y:5,label:"MAX (1, 5)",color:"#ef4444",lo:[-70,-10]},{x:2,y:3,label:"inflection (2, 3)",color:"#f59e0b",lo:[10,-10]},{x:3,y:1,label:"MIN (3, 1)",color:"#10b981",lo:[10,14]}]}/>
  <Box color="green"><p>Max 5 at <M d="x=1"/>; min 1 at <M d="x=3"/>; inflection at <M d="(2,3)"/>; concave down for <M d="x<2"/>, concave up for <M d="x>2"/>.</p></Box>
</div>)},
]},

{slug:"absolute-extrema",module:"Applications of Derivatives",title:"Absolute Extrema",time:"10 min",content:[
{type:"concept",label:"The Tallest Hill in the Whole Range",render:()=>(
<div>
  <p>A <strong>local</strong> max is just the top of one hill. An <strong>absolute</strong> max is the single highest point over an <em>entire</em> interval, the tallest hill in the whole mountain range.</p>
  <Box><p>First, two pieces of notation used below. <M d="[a,b]"/> with square brackets means all the <M d="x"/>-values from <M d="a"/> to <M d="b"/> <strong>including</strong> the two endpoints. <M d="(a,b)"/> with round brackets means the same stretch but <strong>without</strong> the endpoints (strictly between them). Square brackets include the ends, round brackets exclude them.</p></Box>
  <p>Here is the catch that local maxima miss: on a closed interval <M d="[a,b]"/>, the highest or lowest point can sit at an <strong>endpoint</strong>, even if the slope there is not zero. Think of a stock price over one trading day: the high might be a peak in the middle, or it might just be the closing price at the bell.</p>
  <Box><p><strong>Closed Interval Method:</strong> for a smooth, unbroken curve on a closed interval, the absolute max and min can only occur at a critical number inside the interval or at an endpoint. So you have just a short list of suspects to check.</p>
  <p>Why only those spots? Take any point strictly inside the interval that is not a critical number. There the slope is not zero, so the curve is tilted through it: step a little one way and you go higher, step the other way and you go lower. A tilted interior point therefore always has both a taller and a shorter neighbor, so it can never be the absolute highest or lowest. That leaves only the flat-or-cornered spots (the critical numbers) and the two endpoints, where you simply run out of room to step any further.</p></Box>
</div>
)},
{type:"rule",label:"The Closed Interval Method",render:()=>(<div><p>To find the absolute extrema of <M d="f"/> on <M d="[a,b]"/>:</p><p>1. Find the critical numbers inside <M d="(a,b)"/>.</p><p>2. Make a list: those critical numbers plus the two endpoints <M d="a"/> and <M d="b"/>.</p><p>3. Evaluate <M d="f"/> at every value on the list.</p><p>4. The biggest output is the absolute max; the smallest is the absolute min.</p><p>No sign chart and no second derivative are needed: you are comparing actual heights, not classifying shapes.</p></div>)},
{type:"example",label:"Why Endpoints Matter",render:()=>(
<div>
  <p>Absolute extrema of <M d="f(x)=x^2"/> on <M d="[1,4]"/>.</p>
  <p><strong>Step 1:</strong> <M d="f'(x)=2x=0"/> gives <M d="x=0"/>. But 0 is <em>not</em> inside <M d="[1,4]"/>, so we ignore it. No critical numbers in range.</p>
  <p><strong>Step 2:</strong> The only suspects are the endpoints, <M d="x=1"/> and <M d="x=4"/>.</p>
  <Box><p><M d="f(1)=1"/></p><p><M d="f(4)=16"/></p></Box>
  <Box color="green"><p>Absolute min = 1 at <M d="x=1"/>. Absolute max = 16 at <M d="x=4"/>. Both happen at endpoints, where the slope is not zero.</p></Box>
</div>
)},
{type:"example",label:"When Capacity Wins",render:()=>(
<div>
  <p>A firm's profit is <M d="P(x)=-0.01x^2+40x-7000"/> dollars for <M d="x"/> units, but its factory can make at most 1,500 units. What production level maximizes profit?</p>
  <p><strong>Step 1: Critical numbers.</strong> <M d="P'(x)=-0.02x+40=0"/> gives <M d="x=2000"/>. That is the unconstrained peak (the one <Ref to="optimization"/> will find), but the factory cannot get there: 2000 is <em>outside</em> the allowed range <M d="[0,1500]"/>. So there are no critical numbers inside the interval.</p>
  <p><strong>Step 2: The suspects are the endpoints only.</strong></p>
  <Box>
    <p><M d="P(0)=-7000"/> (make nothing, pay the fixed costs)</p>
    <p><M d="P(1500)=-0.01(2{,}250{,}000)+40(1500)-7000=-22500+60000-7000=30{,}500"/></p>
  </Box>
  <p><strong>Step 3: Compare.</strong> The absolute max on <M d="[0,1500]"/> is $30,500, at the capacity limit. The firm should run flat out.</p>
  <Graph fn={(x)=>-0.01*x*x+40*x-7000} xMin={0} xMax={2600} yMin={-8000} yMax={36000}
    shades={[{top:(x)=>-0.01*x*x+40*x-7000,bottom:-8000,from:1500,to:2600,color:"rgba(148,163,184,0.10)"}]}
    highlights={[{x:1500,y:30500,label:"capacity: $30,500",color:"#f59e0b",lo:[-100,-12]},{x:2000,y:33000,label:"unreachable peak: $33,000",color:"#64748b",lo:[-60,-14]}]}
    caption="The profit curve keeps rising past 1,500 units, but the factory stops there. On the allowed range, the endpoint is the maximum."/>
  <Box color="green"><p>Maximum profit within capacity is $30,500 at 1,500 units. The true vertex ($33,000 at 2,000 units) is out of reach, so the best allowed choice is an endpoint, where the slope is still positive. Whenever a business has a limit (capacity, budget, a regulated price range), check the endpoints.</p></Box>
</div>
)},
{type:"practice",render:()=>(<span>Absolute extrema of <M d="f(x)=x^3-3x"/> on <M d="[-2,3]"/>.</span>),
answer:()=>(<div>
  <p><strong>Step 1: Critical numbers.</strong></p>
  <M d="f'(x)=3x^2-3=0\;\Rightarrow\;x^2=1\;\Rightarrow\;x=\pm 1" block/>
  <p>Both <M d="-1"/> and <M d="1"/> are inside <M d="[-2,3]"/>, so both count.</p>
  <p><strong>Step 2: Build the list.</strong> Critical numbers and endpoints: <M d="-2,\;-1,\;1,\;3"/>.</p>
  <p><strong>Step 3: Evaluate <M d="f"/> at each.</strong></p>
  <Box><p><M d="f(-2)=-8+6=-2"/></p><p><M d="f(-1)=-1+3=2"/></p><p><M d="f(1)=1-3=-2"/></p><p><M d="f(3)=27-9=18"/></p></Box>
  <Box color="green"><p>Absolute max = 18 at <M d="x=3"/> (an endpoint). Absolute min = <M d="-2"/>, reached twice, at <M d="x=-2"/> and <M d="x=1"/>.</p></Box>
</div>)},
{type:"practice",render:()=>(<span>A theater's weekly revenue at ticket price <M d="p"/> is <M d="R(p)=600p-20p^2"/>, but a city rule keeps the price between $5 and $12. What price gives the most revenue, and what price gives the least?</span>),
answer:()=>(<div>
  <p><strong>Step 1: Critical numbers.</strong> <M d="R'(p)=600-40p=0"/> gives <M d="p=15"/>. That is outside <M d="[5,12]"/>, so it is not allowed. No critical numbers in range.</p>
  <p><strong>Step 2: Endpoints only.</strong></p>
  <Box>
    <p><M d="R(5)=3000-500=2{,}500"/></p>
    <p><M d="R(12)=7200-2880=4{,}320"/></p>
  </Box>
  <p><strong>Step 3: Compare.</strong> The most revenue allowed is $4,320 at $12; the least is $2,500 at $5.</p>
  <p>Interpretation: revenue keeps rising all the way up to the $15 vertex, so within the permitted range, the higher the price the better. The rule caps the theater at $12, and it should charge exactly that.</p>
  <Box color="green"><p>Max revenue $4,320 at <M d="p=\$12"/>; min revenue $2,500 at <M d="p=\$5"/>. Both at endpoints.</p></Box>
</div>)},
]},

{slug:"optimization",module:"Applications of Derivatives",title:"Optimization",time:"12 min",content:[
{type:"concept",label:"The Best Possible Choice",render:()=>(
<div>
  <p>Optimization is the headline reason business students take calculus. The question is always the same: <strong>"What choice makes profit as big as possible, or cost as small as possible?"</strong></p>
  <p>The idea is simple. Whatever you want to maximize or minimize, write it as a function of one variable, then find its peak or valley with the derivative. The maximum profit, the cheapest production level, the price that brings in the most revenue: all of them sit where the slope is zero, unless the best allowed choice is forced to an endpoint of the range, as in <Ref to="absolute-extrema"/>. For the open-ended business curves below, the peak or valley is an interior flat spot.</p>
  <p>The genuinely hard part is usually not the calculus. It is the first step: turning a paragraph of words into a single function of a single variable. The examples below put most of their effort there.</p>
</div>
)},
{type:"rule",label:"The Optimization Recipe",render:()=>(
<div>
  <p>1. Write the quantity to optimize as a function of <strong>one</strong> variable. If it has two, find the constraint that links them and substitute it in.</p>
  <p>2. Take the derivative and set it equal to 0.</p>
  <p>3. Solve for the variable (the candidate).</p>
  <p>4. Confirm it is really a max or min: the second derivative (<Ref to="concavity"/>), a sign chart (<Ref to="first-derivative-test"/>), or common sense.</p>
  <p>5. Answer the actual question (often the dollar value, or the dimensions, not just the <M d="x"/>).</p>
  <p><strong>A fact worth knowing:</strong> average cost is minimized exactly where average cost equals marginal cost, <M d="AC(x)=C'(x)"/>. The third example shows why.</p>
</div>
)},
{type:"example",label:"Maximizing Revenue",render:()=>(
<div>
  <p>A theater finds that if tickets cost <M d="p"/> dollars, weekly attendance is <M d="q=600-20p"/>. What price maximizes revenue?</p>
  <p><strong>Step 1: Write revenue as one function.</strong> If the theater sells <M d="q"/> tickets at <M d="p"/> dollars each, the money collected is price times number sold: <M d="R=p\cdot q"/>. That still has two letters in it. But the problem tells us <M d="q=600-20p"/>, so we replace <M d="q"/> and leave everything in terms of the single variable <M d="p"/>:</p>
  <M d="R(p)=p\,(600-20p)=600p-20p^2" block/>
  <p>Collapsing two variables down to one is exactly what Step 1 asks for; only now can the derivative hunt for the peak.</p>
  <p><strong>Step 2: Differentiate and set to 0.</strong></p>
  <M d="R'(p)=600-40p=0" block/>
  <p><strong>Step 3: Solve.</strong> <M d="40p=600"/>, so <M d="p=15"/>.</p>
  <p><strong>Step 4: Confirm a max.</strong> <M d="R''(p)=-40<0"/> (concave down, a dome), so it is a maximum.</p>
  <p><strong>Step 5: Answer.</strong> At <M d="p=15"/>: <M d="R(15)=600(15)-20(225)=9000-4500=\$4{,}500"/>.</p>
  <Graph fn={(p)=>600*p-20*p*p} xMin={0} xMax={30} yMin={0} yMax={5000} highlights={[{x:15,y:4500,label:"$4,500 at $15",color:"#f59e0b",lo:[-60,18]}]}/>
  <Box color="green"><p>Charge <M d="\$15"/> per ticket for maximum revenue of <M d="\$4{,}500"/> per week. (Check: in <Ref to="elasticity"/> the revenue peak is where demand is unit elastic. Here <M d="E(15)=-\tfrac{15(-20)}{300}=1"/>. It agrees.)</p></Box>
</div>
)},
{type:"example",label:"Building the Function From a Constraint",render:()=>(
<div>
  <p>The last example handed us the relationship <M d="q=600-20p"/>. This time we have to build it ourselves, which is the situation most word problems give you.</p>
  <p><em>"A farmer has 100 meters of fencing to make a rectangular pen against a long barn wall. The wall forms one side, so no fence is needed there. What dimensions enclose the largest area?"</em></p>
  <p><strong>Step 1: Write the quantity to optimize, then force it down to one variable.</strong></p>
  <p>Call the two sides that stick straight out from the wall <M d="x"/> each, and the side running parallel to the wall <M d="y"/>. The thing we want to make as big as possible is the area:</p>
  <M d="A=x\cdot y" block/>
  <p>That has two letters, so it is not ready yet. What ties <M d="x"/> and <M d="y"/> together is the fencing. It runs along the two <M d="x"/> sides and the single <M d="y"/> side (the wall covers the fourth side), and there are only 100 meters of it. That sentence is the <strong>constraint</strong>:</p>
  <M d="2x+y=100" block/>
  <p>Solve the constraint for <M d="y"/> so we can eliminate it: <M d="y=100-2x"/>. Now substitute that into the area:</p>
  <M d="A(x)=x\,(100-2x)=100x-2x^2" block/>
  <p>Area is finally a function of the single variable <M d="x"/>, and the recipe can take over.</p>
  <p><strong>Step 2: Differentiate and set to 0.</strong> <M d="A'(x)=100-4x=0"/>.</p>
  <p><strong>Step 3: Solve.</strong> <M d="4x=100"/>, so <M d="x=25"/>.</p>
  <p><strong>Step 4: Confirm a max.</strong> <M d="A''(x)=-4<0"/>, concave down (a dome), so it is a maximum.</p>
  <p><strong>Step 5: Answer the real question, the dimensions.</strong> <M d="x=25"/> m, and <M d="y=100-2(25)=50"/> m.</p>
  <Box color="green"><p>The pen is <M d="25"/> m out from the wall and <M d="50"/> m along it, for a maximum area of <M d="25\times 50=1{,}250"/> square meters.</p></Box>
</div>
)},
{type:"example",label:"Minimizing Average Cost",render:()=>(
<div>
  <p>A manufacturer's cost is <M d="C(x)=0.5x^2+20x+800"/> dollars for <M d="x"/> units. What production level makes the cost <em>per unit</em> as low as possible?</p>
  <p><strong>Step 1: The function.</strong> Cost per unit is average cost (<Ref to="business-models"/>): total cost divided by units. Split the fraction term by term and use a negative exponent for the last piece:</p>
  <M d="AC(x)=\frac{0.5x^2+20x+800}{x}=0.5x+20+\frac{800}{x}=0.5x+20+800x^{-1}" block/>
  <p>Already one variable, so Step 1 is done.</p>
  <p><strong>Step 2: Differentiate and set to 0.</strong> The power rule handles <M d="800x^{-1}"/> (<Ref to="power-rule"/>): bring down <M d="-1"/>, exponent becomes <M d="-2"/>:</p>
  <M d="AC'(x)=0.5-800x^{-2}=0.5-\frac{800}{x^2}=0" block/>
  <p><strong>Step 3: Solve.</strong> <M d="\tfrac{800}{x^2}=0.5"/>, so <M d="x^2=1600"/>, so <M d="x=40"/> (the negative root is meaningless for a quantity).</p>
  <p><strong>Step 4: Confirm a min.</strong> <M d="AC''(x)=1600x^{-3}=\tfrac{1600}{x^3}"/>, which is positive for any positive <M d="x"/>: concave up, a bowl, so a minimum.</p>
  <p><strong>Step 5: Answer.</strong> <M d="AC(40)=0.5(40)+20+\tfrac{800}{40}=20+20+20=\$60"/> per unit.</p>
  <p><strong>The fact from the rule box.</strong> Marginal cost is <M d="C'(x)=x+20"/>, so <M d="C'(40)=60"/>. At the minimum, average cost and marginal cost are both $60. That is not luck. Think about it in words: if the next unit costs less than the current average, making it pulls the average down; if it costs more, it pushes the average up. The average stops falling and starts rising exactly when the next unit costs the same as the average. In symbols, <M d="AC'(x)=0"/> happens exactly when <M d="C'(x)=AC(x)"/>.</p>
  <Graph fns={[(x)=>0.5*x+20+800/x,(x)=>x+20]} xMin={5} xMax={100} yMin={0} yMax={160}
    highlights={[{x:40,y:60,label:"AC = MC = $60 at 40 units",color:"#f59e0b",lo:[10,-14]}]}
    label={<><span style={{color:"#818cf8"}}>Average cost</span> <span style={{color:"#e2e8f0"}}>and</span> <span style={{color:"#f472b6"}}>marginal cost</span></>}
    caption="Marginal cost crosses average cost at the bottom of the average cost curve."/>
  <Box color="green"><p>Produce 40 units for the lowest average cost, $60 per unit, where marginal cost equals average cost.</p></Box>
</div>
)},
{type:"interactive",render:()=>(<SlopeExplorer fn={(x)=>-0.01*x*x+40*x-7000} dfn={(x)=>-0.02*x+40} xMin={0} xMax={4000} yMin={-10000} yMax={40000} start={400}
  intro="Maximum profit sits exactly where the curve stops climbing, where the slope is zero. Drag the point toward the top and watch the orange tangent line go flat right at the peak."/>)},
{type:"practice",render:()=>(<span>A firm's profit is <M d="P(x)=-0.01x^2+40x-7000"/> dollars when it makes <M d="x"/> units. How many units maximize profit, and what is that profit?</span>),
answer:()=>(<div>
  <p><strong>Step 1: The function is already given</strong> (profit in terms of one variable, <M d="x"/>).</p>
  <p><strong>Step 2: Differentiate and set to 0.</strong></p>
  <M d="P'(x)=-0.02x+40=0" block/>
  <p><strong>Step 3: Solve.</strong></p>
  <M d="0.02x=40\;\Rightarrow\;x=2000" block/>
  <p><strong>Step 4: Confirm a max.</strong></p>
  <M d="P''(x)=-0.02<0\;\Rightarrow\;\text{concave down, so a maximum}" block/>
  <p><strong>Step 5: Find the actual profit.</strong></p>
  <M d="P(2000)=-0.01(2000)^2+40(2000)-7000" block/>
  <M d="=-40000+80000-7000=\$33{,}000" block/>
  <Graph fn={(x)=>-0.01*x*x+40*x-7000} xMin={0} xMax={4000} yMin={-10000} yMax={40000} highlights={[{x:2000,y:33000,label:"$33K",color:"#f59e0b",lo:[-40,-12]}]}/>
  <Box color="green"><p>Produce 2,000 units for maximum profit of $33,000. (In <Ref to="absolute-extrema"/> the same firm was capped at 1,500 units and had to settle for $30,500; without the cap, the vertex is reachable.)</p></Box>
</div>)},
{type:"practice",render:()=>(<span>A store sells <strong>1,200</strong> units of a product each year. Every order it places costs <strong>$50</strong> to process, and holding inventory costs <strong>$3 per unit per year</strong>, charged on the average amount in stock. If it orders <M d="x"/> units at a time, the average stock is <M d="\tfrac{x}{2}"/>. How many units per order minimize the total yearly cost?</span>),
answer:()=>(<div>
  <p><strong>Step 1: Build the cost function.</strong> Two costs pull in opposite directions. Ordering <M d="x"/> at a time means <M d="\tfrac{1200}{x}"/> orders a year, each costing $50. Holding costs $3 on an average stock of <M d="\tfrac{x}{2}"/>. Total yearly cost:</p>
  <M d="T(x)=50\cdot\frac{1200}{x}+3\cdot\frac{x}{2}=\frac{60000}{x}+1.5x=60000x^{-1}+1.5x" block/>
  <p>Big orders mean few orders but a lot of stock sitting around; small orders mean little stock but constant reordering. The derivative finds the balance.</p>
  <p><strong>Step 2: Differentiate and set to 0.</strong></p>
  <M d="T'(x)=-\frac{60000}{x^2}+1.5=0" block/>
  <p><strong>Step 3: Solve.</strong> <M d="\tfrac{60000}{x^2}=1.5"/>, so <M d="x^2=40000"/>, so <M d="x=200"/>.</p>
  <p><strong>Step 4: Confirm a min.</strong> <M d="T''(x)=\tfrac{120000}{x^3}>0"/> for positive <M d="x"/>: a bowl, so a minimum.</p>
  <p><strong>Step 5: Answer the real question.</strong> Order 200 units at a time, which is <M d="\tfrac{1200}{200}=6"/> orders a year. The yearly cost is <M d="T(200)=\tfrac{60000}{200}+1.5(200)=300+300=\$600"/>. Notice the two costs are equal at the optimum, $300 each; that balance is typical of this kind of problem.</p>
  <Box color="green"><p>Order 200 units at a time (6 orders a year) for a minimum total cost of $600. This is the classic "economic order quantity" problem, and every warehouse in the world runs on some version of it.</p></Box>
</div>)},
]},

{slug:"antiderivatives",module:"Integration",title:"Antiderivatives",time:"10 min",content:[
{type:"concept",label:"Running the Derivative Backwards",render:()=>(
<div>
  <p>Every operation in math has a reverse. Subtraction undoes addition. Square-rooting undoes squaring. <strong>Integration is the reverse of differentiation.</strong></p>
  <p>Differentiation asks: "I have a position, what is the speed?" Integration asks the opposite: "I know the speed at every moment, what was the position?" In business terms: if you know the <em>rate</em> money flows in (marginal revenue), integration recovers the <em>total</em> (total revenue).</p>
  <p>An <strong>antiderivative</strong> of <M d="f(x)"/> is any function whose derivative is <M d="f(x)"/>. We write it with the integral sign:</p>
  <M d="\int f(x)\,dx = F(x)+C" block/>
  <p>Read it as "the integral of <M d="f(x)"/>." That stretched-S shape <M d="\int"/> is literally an old-style letter S, chosen because an integral is really a <strong>S</strong>um. You cannot see the sum yet, but in <Ref to="riemann-sums"/> the integral becomes a sum of areas and the symbol pays off. The <M d="dx"/> tells you which variable you are integrating with respect to (here, <M d="x"/>); it is also a leftover reminder of <em>width</em>, a tiny step along the <M d="x"/>-axis, which is the picture that matters for area in <Ref to="riemann-sums"/> and for the bit of algebra in <Ref to="substitution"/>.</p>
  <Box>
    <p><strong>Why the mysterious <M d="+C"/>?</strong> The derivative of <M d="x^2"/> is <M d="2x"/>. But so is the derivative of <M d="x^2+7"/>, and of <M d="x^2-100"/>. A constant always differentiates to 0, so when you reverse the process you cannot know which constant was there. We cover all of them at once by writing <M d="+C"/>. The second example shows how a single extra fact pins <M d="C"/> down.</p>
  </Box>
</div>
)},
{type:"rule",label:"The Basic Integration Rules",render:()=>(
<div>
  <p><strong>The Power Rule for integrals</strong> (the reverse of the derivative power rule): add 1 to the exponent, then divide by the new exponent.</p>
  <M d="\int x^n\,dx=\frac{x^{n+1}}{n+1}+C\qquad(n\neq -1)" block/>
  <p>Why add 1 and divide? The derivative power rule does two things: it multiplies by the exponent, then lowers the exponent by 1. To undo it, reverse both steps: raise the exponent by 1, then divide by that new exponent to cancel the multiply. Quick check: differentiate <M d="\tfrac{x^{n+1}}{n+1}"/>; the <M d="n+1"/> comes down front and cancels the division, and the power drops back to <M d="n"/>, leaving <M d="x^n"/>. It reverses exactly as claimed.</p>
  <p><strong>Two special functions reverse to themselves or to a log:</strong></p>
  <M d="\int e^x\,dx=e^x+C\qquad\int\frac{1}{x}\,dx=\ln|x|+C" block/>
  <p>That <M d="\tfrac{1}{x}"/> case is exactly the <M d="n=-1"/> the power rule forbids (you cannot divide by <M d="n+1=0"/>), which is why it gets its own rule.</p>
  <p>Why the bars in <M d="\ln|x|"/>? The function <M d="\tfrac{1}{x}"/> works for negative <M d="x"/> too, but a plain <M d="\ln"/> only accepts positive inputs (<Ref to="logarithms"/>). The absolute value <M d="|x|"/> strips off any minus sign so the log is always fed a positive number, letting the answer cover both sides.</p>
  <p><strong>Helpers:</strong> constants slide out front, and you can integrate term by term:</p>
  <M d="\int k\,f(x)\,dx=k\int f(x)\,dx\qquad\int[f+g]\,dx=\int f\,dx+\int g\,dx" block/>
  <p><strong>Always check by differentiating your answer.</strong> If you get back the function you started with, the integral is right.</p>
</div>
)},
{type:"example",label:"One Term at a Time",render:()=>(
<div>
  <p>Find <M d="\int(6x^2+4x-5)\,dx"/>.</p>
  <p>Integrate each piece using the power rule (add 1 to the exponent, divide by it):</p>
  <Box>
    <p><M d="6x^2"/>: exponent <M d="2+1=3"/>, so <M d="\tfrac{6x^3}{3}=2x^3"/></p>
    <p><M d="4x"/>: exponent <M d="1+1=2"/>, so <M d="\tfrac{4x^2}{2}=2x^2"/></p>
    <p><M d="-5"/>: think of it as <M d="-5x^0"/>, so <M d="\tfrac{-5x^1}{1}=-5x"/></p>
  </Box>
  <M d="\int(6x^2+4x-5)\,dx=2x^3+2x^2-5x+C" block/>
  <p><strong>Check by differentiating.</strong> The derivative of <M d="2x^3+2x^2-5x+C"/> is <M d="6x^2+4x-5"/>. That matches what we started with.</p>
</div>
)},
{type:"example",label:"Pinning Down C: Cost From Marginal Cost",render:()=>(
<div>
  <p>A factory's marginal cost is <M d="C'(x)=25-0.1x"/> dollars per item, and its fixed costs are $1,000. Find the cost function.</p>
  <p><strong>Step 1: Integrate the marginal cost.</strong> Marginal cost is the derivative of cost (<Ref to="marginal"/>), so cost is an antiderivative of marginal cost:</p>
  <M d="C(x)=\int(25-0.1x)\,dx=25x-0.05x^2+K" block/>
  <p>(<M d="25"/> integrates to <M d="25x"/>; <M d="-0.1x"/> integrates to <M d="-0.1\cdot\tfrac{x^2}{2}=-0.05x^2"/>. We call the constant <M d="K"/> here only because <M d="C"/> is already taken for cost.)</p>
  <p><strong>Step 2: Use the extra fact.</strong> Fixed costs are what you pay when you make nothing, so <M d="C(0)=1000"/>. Plug in <M d="x=0"/>:</p>
  <M d="C(0)=0-0+K=1000\;\Rightarrow\;K=1000" block/>
  <p><strong>Step 3: Write the cost function.</strong></p>
  <M d="C(x)=1000+25x-0.05x^2" block/>
  <p>That is exactly the factory from <Ref to="marginal"/>, rebuilt from its marginal cost and one starting value. This is how <M d="+C"/> works in practice: the integral gives a whole family of curves, all with the same slope everywhere, and one known point (called an <strong>initial condition</strong>) picks out the right member of the family.</p>
  <Box color="green"><p><M d="C(x)=1000+25x-0.05x^2"/>. The marginal function tells you the shape; the fixed cost tells you the height.</p></Box>
</div>
)},
{type:"practice",render:()=>(<span>Find <M d="\int\left(4x^3-\dfrac{2}{x}+5e^x\right)dx"/></span>),
answer:()=>(<div>
  <p>Integrate term by term. Watch for the <M d="\tfrac{1}{x}"/> special case.</p>
  <Box>
    <p><M d="4x^3"/>: exponent <M d="3+1=4"/>, so <M d="\tfrac{4x^4}{4}=x^4"/></p>
    <p><M d="-\tfrac{2}{x}=-2\cdot\tfrac{1}{x}"/>: the special case, giving <M d="-2\ln|x|"/></p>
    <p><M d="5e^x"/>: <M d="e^x"/> integrates to itself, so <M d="5e^x"/></p>
  </Box>
  <M d="\int\left(4x^3-\tfrac{2}{x}+5e^x\right)dx=x^4-2\ln|x|+5e^x+C" block/>
  <Box color="green"><p>Answer: <M d="x^4-2\ln|x|+5e^x+C"/>. Check: differentiate it and you get back <M d="4x^3-\tfrac{2}{x}+5e^x"/>.</p></Box>
</div>)},
{type:"practice",render:()=>(<span>A company's marginal revenue is <M d="R'(x)=80-0.2x"/> dollars per unit, and of course <M d="R(0)=0"/> (no sales, no revenue). Find <M d="R(x)"/>, then recover the price-demand equation <M d="p"/> the company must be using.</span>),
answer:()=>(<div>
  <p><strong>Step 1: Integrate.</strong></p>
  <M d="R(x)=\int(80-0.2x)\,dx=80x-0.1x^2+K" block/>
  <p><strong>Step 2: Initial condition.</strong> <M d="R(0)=0"/> gives <M d="0-0+K=0"/>, so <M d="K=0"/>:</p>
  <M d="R(x)=80x-0.1x^2" block/>
  <p>This is the revenue function from the second practice in <Ref to="marginal"/>, recovered from its derivative.</p>
  <p><strong>Step 3: The price-demand equation.</strong> Revenue is price times quantity (<Ref to="business-models"/>), so price is revenue divided by quantity:</p>
  <M d="p=\frac{R(x)}{x}=\frac{80x-0.1x^2}{x}=80-0.1x" block/>
  <Box color="green"><p><M d="R(x)=80x-0.1x^2"/> and <M d="p=80-0.1x"/>. Three lessons connect here: marginal revenue (a derivative) integrates back to revenue, and revenue divided by quantity gives the price-demand line that produced it.</p></Box>
</div>)},
]},

{slug:"substitution",module:"Integration",title:"Substitution",time:"11 min",content:[
{type:"concept",label:"The Chain Rule in Reverse",render:()=>(
<div>
  <p>The power rule and the <M d="e^x"/> rule only handle simple, "bare" expressions. But what about <M d="\int e^{5x}\,dx"/> or <M d="\int 2x(x^2+1)^3\,dx"/>, where one function is buried <em>inside</em> another?</p>
  <p><strong>Substitution</strong> is the reverse of the chain rule. The chain rule (<Ref to="chain-rule"/>) created those nested functions when differentiating; substitution unwinds them when integrating.</p>
  <p>The trick: rename the messy inner part as a single letter, <M d="u"/>. If you also account for its derivative, the whole integral collapses into a simple one you already know.</p>
  <p>Here is <em>why</em> you must account for the derivative. When the chain rule differentiates <M d="F(\text{inside})"/>, it always leaves an extra factor behind: the derivative of the inside. So any integral that came from a chain-rule derivative must secretly contain that factor. Finding it (or arranging for it) is exactly what lets the integral collapse back into the simple <M d="F(u)"/> form.</p>
  <p><strong>Why are we allowed to "solve for <M d="dx"/>"?</strong> The symbol <M d="\tfrac{du}{dx}"/> means "the derivative of <M d="u"/>." For substitution you are allowed to treat it like an ordinary fraction and multiply both sides by <M d="dx"/>, which gives <M d="du=u'\,dx"/>. This is just bookkeeping: it records exactly how a tiny step in <M d="x"/> corresponds to a tiny step in <M d="u"/>, so every <M d="dx"/> in the integral can be traded for the matching amount of <M d="du"/>.</p>
</div>
)},
{type:"rule",label:"The Substitution Method",render:()=>(
<div>
  <Box>
    <p><strong>The 4 steps:</strong></p>
    <p>1. Let <M d="u"/> = the inner function (the thing inside the power, the exponent, or the log).</p>
    <p>2. Compute <M d="du=u'\,dx"/> and solve for <M d="dx"/>.</p>
    <p>3. Rewrite the integral entirely in terms of <M d="u"/> (no <M d="x"/> left), then integrate.</p>
    <p>4. Substitute the original expression back in for <M d="u"/>.</p>
  </Box>
  <p><strong>Two shortcuts that fall out of the method</strong> (both for <M d="k\neq 0"/>):</p>
  <M d="\int e^{kx}\,dx=\frac{e^{kx}}{k}+C\qquad\int\frac{u'}{u}\,dx=\ln|u|+C" block/>
  <p>The first says: integrating <M d="e^{kx}"/> <em>divides</em> by <M d="k"/>, the reverse of the chain rule multiplying by it. The second says: whenever the top of a fraction is the derivative of the bottom, the integral is a log.</p>
  <p><strong>If a constant is missing,</strong> multiply and divide by it. You may only adjust by constants, never by anything containing <M d="x"/>.</p>
</div>
)},
{type:"example",label:"Spotting the Inner Function",render:()=>(
<div>
  <p>Find <M d="\int 2x\,(x^2+1)^3\,dx"/>.</p>
  <p><strong>Step 1: Pick <M d="u"/>.</strong> The messy inner part is <M d="x^2+1"/>, so let <M d="u=x^2+1"/>.</p>
  <p><strong>Step 2: Find <M d="du"/>.</strong> Differentiate: <M d="\tfrac{du}{dx}=2x"/>, so <M d="du=2x\,dx"/>.</p>
  <p><strong>Step 3: Rewrite.</strong> Notice the <M d="2x\,dx"/> already sitting in the integral is exactly <M d="du"/>:</p>
  <M d="\int (x^2+1)^3\,(2x\,dx)=\int u^3\,du=\frac{u^4}{4}+C" block/>
  <p><strong>Step 4: Substitute back</strong> <M d="u=x^2+1"/>:</p>
  <M d="\frac{(x^2+1)^4}{4}+C" block/>
  <p><strong>Check it the <Ref to="antiderivatives"/> way, by differentiating.</strong> The derivative of <M d="\tfrac{(x^2+1)^4}{4}"/> is, by the chain rule, <M d="\tfrac{4(x^2+1)^3}{4}"/> times the derivative of the inside <M d="2x"/>, which is <M d="(x^2+1)^3\cdot 2x"/>, exactly the integrand we started with. Watching the chain rule hand back that <M d="2x"/> is watching <em>why</em> substitution works.</p>
  <Box color="green"><p>Answer: <M d="\tfrac{(x^2+1)^4}{4}+C"/>. The hard nested integral became a simple power-rule problem once we renamed the inside.</p></Box>
</div>
)},
{type:"example",label:"Adjusting a Missing Constant",render:()=>(
<div>
  <p>Find <M d="\int x\,e^{x^2}\,dx"/>.</p>
  <p><strong>Step 1: Pick <M d="u"/>.</strong> The inner function is the exponent: <M d="u=x^2"/>.</p>
  <p><strong>Step 2: Find <M d="du"/>.</strong> <M d="du=2x\,dx"/>. But the integral only has <M d="x\,dx"/>, not <M d="2x\,dx"/>. We are short by a factor of 2.</p>
  <p><strong>Step 3: Fix the constant, then rewrite.</strong> Since <M d="du=2x\,dx"/>, dividing both sides by 2 gives <M d="x\,dx=\tfrac{du}{2}"/>. That is allowed because 2 is a constant. Substitute:</p>
  <M d="\int e^{u}\cdot\frac{du}{2}=\frac12\int e^{u}\,du=\frac12 e^{u}+C" block/>
  <p><strong>Step 4: Substitute back.</strong></p>
  <M d="\int x\,e^{x^2}\,dx=\frac{e^{x^2}}{2}+C" block/>
  <p><strong>Check.</strong> Differentiate <M d="\tfrac12 e^{x^2}"/>: the chain rule gives <M d="\tfrac12 e^{x^2}\cdot 2x=x\,e^{x^2}"/>. Correct. The <M d="\tfrac12"/> we introduced is exactly what cancels the 2 the chain rule produces.</p>
  <Box color="green"><p>Answer: <M d="\tfrac{e^{x^2}}{2}+C"/>. A missing constant is fixed by dividing; a missing <M d="x"/> could not be, and would mean substitution is the wrong tool.</p></Box>
</div>
)},
{type:"practice",render:()=>(<span>Find <M d="\int e^{5x}\,dx"/></span>),
answer:()=>(<div>
  <p><strong>Step 1:</strong> The inner function is the exponent. Let <M d="u=5x"/>.</p>
  <p><strong>Step 2:</strong> <M d="\tfrac{du}{dx}=5"/>, so <M d="du=5\,dx"/>, which rearranges to <M d="dx=\tfrac{du}{5}"/>.</p>
  <p><strong>Step 3:</strong> Replace <M d="5x"/> with <M d="u"/> and <M d="dx"/> with <M d="\tfrac{du}{5}"/>:</p>
  <M d="\int e^{u}\cdot\frac{du}{5}=\frac{1}{5}\int e^{u}\,du=\frac{1}{5}e^{u}+C" block/>
  <p><strong>Step 4:</strong> Put <M d="u=5x"/> back:</p>
  <M d="\frac{e^{5x}}{5}+C" block/>
  <Box color="green"><p>Answer: <M d="\tfrac{e^{5x}}{5}+C"/>. This is the shortcut <M d="\int e^{kx}\,dx=\tfrac{e^{kx}}{k}+C"/> from the rule box, derived by hand. (With <M d="k=0"/> you would be integrating the constant 1, which gives <M d="x+C"/>.)</p></Box>
</div>)},
{type:"practice",render:()=>(<span>Find <M d="\displaystyle\int\frac{x}{x^2+1}\,dx"/></span>),
answer:()=>(<div>
  <p><strong>Step 1: Pick <M d="u"/>.</strong> The bottom is the messy part: <M d="u=x^2+1"/>.</p>
  <p><strong>Step 2: Find <M d="du"/>.</strong> <M d="du=2x\,dx"/>, so <M d="x\,dx=\tfrac{du}{2}"/> (dividing by the constant 2, as in the second example).</p>
  <p><strong>Step 3: Rewrite and integrate.</strong> The top <M d="x\,dx"/> becomes <M d="\tfrac{du}{2}"/> and the bottom becomes <M d="u"/>:</p>
  <M d="\int\frac{1}{u}\cdot\frac{du}{2}=\frac12\int\frac{du}{u}=\frac12\ln|u|+C" block/>
  <p>(The <M d="\tfrac1u"/> integral is the special log case from <Ref to="antiderivatives"/>.)</p>
  <p><strong>Step 4: Substitute back.</strong></p>
  <M d="\int\frac{x}{x^2+1}\,dx=\frac12\ln(x^2+1)+C" block/>
  <p>The absolute value bars can be dropped here because <M d="x^2+1"/> is always positive.</p>
  <p><strong>Check.</strong> Differentiate <M d="\tfrac12\ln(x^2+1)"/>: by the chain rule, <M d="\tfrac12\cdot\tfrac{1}{x^2+1}\cdot 2x=\tfrac{x}{x^2+1}"/>. Correct.</p>
  <Box color="green"><p>Answer: <M d="\tfrac12\ln(x^2+1)+C"/>. Top is (almost) the derivative of the bottom, so the answer is a log, with a <M d="\tfrac12"/> to fix the missing constant.</p></Box>
</div>)},
]},

{slug:"riemann-sums",module:"Integration",title:"Area as a Sum: Riemann Sums",time:"12 min",content:[
{type:"concept",label:"Area Out of Rectangles",render:()=>(
<div>
  <p>In <Ref to="antiderivatives"/> the integral sign was introduced as a stretched S for "sum," with a promise that the sum would show up. This is the lesson where it does. The question sounds nothing like antiderivatives: <strong>what is the area under a curve?</strong> By the end of the next two lessons the two ideas will turn out to be one.</p>
  <p>Take the parabola <M d="f(x)=x^2"/> between <M d="x=0"/> and <M d="x=2"/>. The region under it is curved on top, and there is no formula for the area of a curved shape the way there is for a rectangle. So we cheat: we cover the region with rectangles, whose areas we <em>can</em> compute, and add them up.</p>
  <p><strong>Four rectangles, left corners on the curve.</strong> Cut <M d="[0,2]"/> into 4 equal strips. Each has width <M d="\Delta x=\tfrac{2-0}{4}=0.5"/>. Make each rectangle's height the curve's value at the strip's <em>left</em> edge:</p>
  <Box>
    <p>Strip 1, from 0 to 0.5: height <M d="f(0)=0"/>, area <M d="0\times 0.5=0"/></p>
    <p>Strip 2, from 0.5 to 1: height <M d="f(0.5)=0.25"/>, area <M d="0.25\times 0.5=0.125"/></p>
    <p>Strip 3, from 1 to 1.5: height <M d="f(1)=1"/>, area <M d="1\times 0.5=0.5"/></p>
    <p>Strip 4, from 1.5 to 2: height <M d="f(1.5)=2.25"/>, area <M d="2.25\times 0.5=1.125"/></p>
  </Box>
  <M d="\text{left sum}=0+0.125+0.5+1.125=1.75" block/>
  <p>Look at the picture: every rectangle sits <em>below</em> the rising curve, so 1.75 is an <strong>underestimate</strong>.</p>
  <p><strong>Now use the right corners.</strong> Same strips, but each height is the curve's value at the strip's <em>right</em> edge: <M d="f(0.5)=0.25"/>, <M d="f(1)=1"/>, <M d="f(1.5)=2.25"/>, <M d="f(2)=4"/>.</p>
  <M d="\text{right sum}=(0.25+1+2.25+4)\times 0.5=7.5\times 0.5=3.75" block/>
  <p>Now every rectangle pokes <em>above</em> the curve, so 3.75 is an <strong>overestimate</strong>. The true area is trapped between 1.75 and 3.75. That is already useful, and we have not done anything but multiply and add.</p>
  <Graph fn={(x)=>x*x} xMin={-0.2} xMax={2.3} yMin={-0.3} yMax={4.4}
    shades={[{top:0.25,bottom:0,from:0.5,to:1,color:"rgba(230,180,90,0.3)"},{top:1,bottom:0,from:1,to:1.5,color:"rgba(230,180,90,0.3)"},{top:2.25,bottom:0,from:1.5,to:2,color:"rgba(230,180,90,0.3)"}]}
    caption="Four left-corner rectangles under y = x squared on [0, 2] (the first has height zero). They add up to 1.75, less than the true area because each one sits below the rising curve."/>
</div>
)},
{type:"concept",label:"More Rectangles, Less Gap",render:()=>(
<div>
  <p>The rectangles miss because the curve bends and they do not. The cure is obvious: use thinner rectangles, so each one has less curve to miss. Here is what happens as the number of strips <M d="n"/> grows (every number computed the same way as above, just with more strips):</p>
  <Box>
    <p><M d="n=4"/>: left 1.75, right 3.75</p>
    <p><M d="n=8"/>: left 2.1875, right 3.1875</p>
    <p><M d="n=16"/>: left 2.4219, right 2.9219</p>
    <p><M d="n=100"/>: left 2.6268, right 2.7068</p>
    <p><M d="n=1000"/>: left 2.6627, right 2.6707</p>
  </Box>
  <p>Both columns are squeezing toward the same number, about <strong>2.6667</strong>, which is <M d="\tfrac{8}{3}"/>. The left sums climb up to it and the right sums drop down to it; at <M d="n=1000"/> they agree to two decimal places. Keep going and they agree to as many decimals as you like. The exact area is the one number both sequences are heading toward, and "the number a sequence is heading toward" is a <strong>limit</strong>, from <Ref to="limits"/>.</p>
  <p>Where does <M d="\tfrac83"/> come from? For now, from the pattern. In <Ref to="ftc"/> you will compute it in one line and understand why.</p>
</div>
)},
{type:"concept",label:"Writing the Sum",render:()=>(
<div>
  <p>Writing out a thousand rectangles is impossible, so mathematicians use a shorthand. The capital Greek letter sigma, <M d="\Sigma"/>, means "add these up":</p>
  <M d="\sum_{i=1}^{n} f(x_i)\,\Delta x" block/>
  <p>Read it as: for each strip number <M d="i"/> from 1 up to <M d="n"/>, take the height <M d="f(x_i)"/> at that strip's chosen point, multiply by the width <M d="\Delta x"/>, and add all the results. It is exactly the arithmetic we did for <M d="n=4"/>, written once for any <M d="n"/>. A sum like this is called a <strong>Riemann sum</strong>, after the mathematician who made the idea precise.</p>
  <p>The exact area is the limit of these sums as the rectangles become infinitely thin, and it gets the integral sign:</p>
  <M d="\int_a^b f(x)\,dx=\lim_{n\to\infty}\sum_{i=1}^{n} f(x_i)\,\Delta x" block/>
  <p>Now the notation from <Ref to="antiderivatives"/> finally makes sense. The <M d="\int"/> is the <M d="\Sigma"/> stretched into an S because the sum has gone continuous. The <M d="f(x)"/> is the height of a rectangle. The <M d="dx"/> is what <M d="\Delta x"/> becomes when the width shrinks toward zero: an infinitely thin width. Height times width, added up: the integral is a sum of infinitely many infinitely thin rectangles, and the numbers <M d="a"/> and <M d="b"/> say where the first and last ones stand.</p>
  <p><strong>The business picture.</strong> Suppose the curve is a marginal cost function, <M d="C'(x)"/> in dollars per item. A rectangle of width 1 at position <M d="x"/> has area <M d="C'(x)\times 1"/>: roughly the cost of one more item (<Ref to="marginal"/>). Add up those rectangles from item 1 to item 100 and you have, roughly, the total cost of producing 100 items. Thin the rectangles and "roughly" becomes "exactly." The area under a marginal cost curve <em>is</em> total cost. That is the bridge between rates and totals that <Ref to="ftc"/> will make official.</p>
</div>
)},
{type:"rule",label:"Riemann Sums and the Definite Integral",render:()=>(
<div>
  <p>Cut <M d="[a,b]"/> into <M d="n"/> strips of width</p>
  <M d="\Delta x=\frac{b-a}{n}" block/>
  <p><strong>Left sum:</strong> heights at the left edge of each strip, <M d="x_i=a+(i-1)\Delta x"/>. <strong>Right sum:</strong> heights at the right edge, <M d="x_i=a+i\,\Delta x"/>.</p>
  <M d="\text{sum}=\sum_{i=1}^{n} f(x_i)\,\Delta x" block/>
  <p>For an increasing function, left sums underestimate and right sums overestimate; for a decreasing function it is the reverse. Either way:</p>
  <M d="\int_a^b f(x)\,dx=\lim_{n\to\infty}\sum_{i=1}^{n} f(x_i)\,\Delta x" block/>
</div>
)},
{type:"example",label:"A Line, Where We Can Check the Answer",render:()=>(
<div>
  <p>Estimate the area under <M d="f(x)=2x+1"/> from 0 to 3 with three rectangles, then find the exact area by geometry.</p>
  <p><strong>Step 1: Set up.</strong> <M d="\Delta x=\tfrac{3-0}{3}=1"/>. The strips are <M d="[0,1]"/>, <M d="[1,2]"/>, <M d="[2,3]"/>.</p>
  <p><strong>Step 2: Left sum.</strong> Heights at 0, 1, 2: <M d="f(0)=1"/>, <M d="f(1)=3"/>, <M d="f(2)=5"/>.</p>
  <M d="\text{left}=(1+3+5)\times 1=9" block/>
  <p><strong>Step 3: Right sum.</strong> Heights at 1, 2, 3: <M d="3"/>, <M d="5"/>, <M d="f(3)=7"/>.</p>
  <M d="\text{right}=(3+5+7)\times 1=15" block/>
  <p><strong>Step 4: The exact area, by geometry.</strong> Under a straight line the region is a rectangle with a triangle on top. The rectangle is 3 wide and 1 tall (area 3). The triangle is 3 wide and rises from height 1 to height 7, so it is 6 tall (area <M d="\tfrac12\times 3\times 6=9"/>). Total: 12.</p>
  <p>Sure enough, 12 sits between the left sum 9 and the right sum 15. In fact it is exactly their average, <M d="\tfrac{9+15}{2}=12"/>; for a straight line, averaging the two sums always gives the exact answer, because the under- and over-shoots are identical triangles.</p>
  <Graph fn={(x)=>2*x+1} xMin={-0.3} xMax={3.4} yMin={-0.5} yMax={8}
    shades={[{top:1,bottom:0,from:0,to:1,color:"rgba(230,180,90,0.3)"},{top:3,bottom:0,from:1,to:2,color:"rgba(230,180,90,0.3)"},{top:5,bottom:0,from:2,to:3,color:"rgba(230,180,90,0.3)"}]}
    caption="Three left rectangles under y = 2x + 1 total 9; the true area, rectangle plus triangle, is 12."/>
  <Box color="green"><p>Left sum 9, right sum 15, exact area 12.</p></Box>
</div>
)},
{type:"interactive",render:()=>(<RiemannExplorer fn={(x)=>x*x} a={0} b={2} exact={8/3} xMin={-0.2} xMax={2.3} yMin={-0.3} yMax={4.4} start={4}
  intro="This is the parabola from the start of the lesson, with left-corner rectangles under it. Drag the slider to add rectangles and watch the sum creep toward the exact area, 8/3. The gap never quite closes at any finite n; the limit is what closes it."/>)},
{type:"practice",render:()=>(<span>Compute the right sum for <M d="f(x)=x^2"/> on <M d="[0,2]"/> with <M d="n=4"/> rectangles, and explain, without computing anything else, why it must be larger than the true area.</span>),
answer:()=>(<div>
  <p><strong>Step 1: Width.</strong> <M d="\Delta x=\tfrac{2}{4}=0.5"/>. Strips: <M d="[0,0.5]"/>, <M d="[0.5,1]"/>, <M d="[1,1.5]"/>, <M d="[1.5,2]"/>.</p>
  <p><strong>Step 2: Right-edge heights.</strong> <M d="f(0.5)=0.25"/>, <M d="f(1)=1"/>, <M d="f(1.5)=2.25"/>, <M d="f(2)=4"/>.</p>
  <p><strong>Step 3: Add and multiply by the width.</strong></p>
  <M d="(0.25+1+2.25+4)\times 0.5=7.5\times 0.5=3.75" block/>
  <p><strong>Why an overestimate?</strong> <M d="x^2"/> is increasing on <M d="[0,2]"/>, so within each strip the curve is highest at the right edge. A rectangle built to that height covers the whole strip at the strip's <em>maximum</em> height, so it contains the region under the curve and then some. Every rectangle overshoots, so the sum overshoots.</p>
  <Box color="green"><p>Right sum = 3.75, above the true area of <M d="\tfrac83\approx 2.667"/>, because right-edge rectangles on a rising curve always overshoot.</p></Box>
</div>)},
{type:"practice",render:()=>(<span>A factory's marginal cost is <M d="C'(x)=20-0.2x"/> dollars per item. Estimate the total cost of the first 10 items using 5 left rectangles of width 2. Then say whether the estimate is high or low, and why.</span>),
answer:()=>(<div>
  <p><strong>Step 1: Set up.</strong> Interval <M d="[0,10]"/>, <M d="n=5"/>, so <M d="\Delta x=2"/>. Left edges at 0, 2, 4, 6, 8.</p>
  <p><strong>Step 2: Heights (marginal cost at each left edge).</strong></p>
  <Box>
    <p><M d="C'(0)=20"/>, <M d="C'(2)=19.6"/>, <M d="C'(4)=19.2"/>, <M d="C'(6)=18.8"/>, <M d="C'(8)=18.4"/></p>
  </Box>
  <p><strong>Step 3: Sum times width.</strong></p>
  <M d="(20+19.6+19.2+18.8+18.4)\times 2=96\times 2=192\text{ dollars}" block/>
  <p>Each rectangle is "cost per item, times two items," so the sum is an estimate of the total cost of items 1 through 10.</p>
  <p><strong>High or low?</strong> This marginal cost <em>falls</em> as <M d="x"/> grows (each item is a little cheaper than the last). On a falling curve the left edge is the highest point of each strip, so left rectangles overshoot. The estimate of $192 is <strong>high</strong>. (The exact total, which <Ref to="ftc"/> will let you compute, is $190.)</p>
  <Box color="green"><p>About $192, an overestimate because the marginal cost curve is decreasing. Area under marginal cost is total cost.</p></Box>
</div>)},
]},

{slug:"definite-integral",module:"Integration",title:"The Definite Integral",time:"9 min",content:[
{type:"concept",label:"A Number, Not a Function",render:()=>(
<div>
  <p>So far the integrals in <Ref to="antiderivatives"/> gave back a <em>function</em> (plus <M d="C"/>). A <strong>definite integral</strong> has two numbers attached and gives back a single <em>number</em>: the area under the curve between those two points, defined in <Ref to="riemann-sums"/> as the limit of rectangle sums.</p>
  <M d="\int_a^b f(x)\,dx = \text{signed area from }x=a\text{ to }x=b" block/>
  <p>The bottom number <M d="a"/> is where you start, the top number <M d="b"/> is where you stop. They are called the <strong>limits of integration</strong> (a different use of the word "limit").</p>
  <p><strong>Why "signed" area?</strong> A rectangle's area is height times width, and if the curve is below the axis its height is negative, so the rectangle contributes a negative amount. Area above the <M d="x"/>-axis counts as positive; area below counts as negative. So an integral can come out negative, which makes sense in business: area under a profit-rate curve that has dipped below zero represents losses.</p>
  <p><strong>The business meaning, once more.</strong> Start with the simplest case. If money flows in at a steady $50 per day for 4 days, the total collected is <M d="50\times 4=\$200"/>, which is exactly the area of a rectangle 4 wide and 50 tall under the flat line <M d="y=50"/>. Total equals height times width equals area. When the rate is a curve instead of a flat line, the Riemann rectangles do the same job, so the total collected is the area under the rate curve. If <M d="f(t)"/> is the rate money flows in per day, then <M d="\int_a^b f(t)\,dt"/> is the total money collected from day <M d="a"/> to day <M d="b"/>.</p>
  <p>How do you compute one? For now, geometry, when the region is a shape you know. <Ref to="ftc"/> reveals the general method, and it is far faster than any rectangle sum.</p>
</div>
)},
{type:"rule",label:"Properties of the Definite Integral",render:()=>(
<div>
  <p>The same linearity rules from antiderivatives still apply, and now they let you combine known integrals without recomputing anything:</p>
  <M d="\int_a^b[f(x)+g(x)]\,dx=\int_a^b f\,dx+\int_a^b g\,dx" block/>
  <M d="\int_a^b k\,f(x)\,dx=k\int_a^b f(x)\,dx" block/>
  <p>Two more facts: flipping the limits flips the sign, and a zero-width interval has zero area:</p>
  <M d="\int_b^a f\,dx=-\int_a^b f\,dx\qquad\int_a^a f\,dx=0" block/>
  <p>Why does flipping the limits flip the sign? Going from <M d="a"/> to <M d="b"/> sweeps left to right with positive widths; going from <M d="b"/> to <M d="a"/> sweeps the opposite way, so every <M d="\Delta x"/> is negative and the whole total flips sign. (After <Ref to="ftc"/> you can also see it directly: swapping the limits turns <M d="F(b)-F(a)"/> into <M d="F(a)-F(b)"/>, the same number negated.)</p>
  <p>And you can split an interval at any point in between:</p>
  <M d="\int_a^b f\,dx=\int_a^c f\,dx+\int_c^b f\,dx" block/>
</div>
)},
{type:"example",label:"Integrals by Geometry",render:()=>(
<div>
  <p>Two definite integrals you can evaluate with nothing but shapes.</p>
  <p><strong>Example A:</strong> <M d="\int_0^3 (2x+1)\,dx"/>. This is the line from <Ref to="riemann-sums"/>, and the region under it is a rectangle (3 by 1, area 3) with a triangle on top (base 3, height 6, area 9):</p>
  <M d="\int_0^3(2x+1)\,dx=3+9=12" block/>
  <p>The rectangle sums in <Ref to="riemann-sums"/> trapped this between 9 and 15; geometry nails it exactly.</p>
  <p><strong>Example B (signed area):</strong> <M d="\int_{-2}^{2} x\,dx"/>. The line <M d="y=x"/> makes a triangle below the axis from <M d="-2"/> to 0 (base 2, height 2, area 2, counted as <M d="-2"/> because it is below) and an identical triangle above the axis from 0 to 2 (counted as <M d="+2"/>):</p>
  <M d="\int_{-2}^{2}x\,dx=-2+2=0" block/>
  <p>The integral is zero even though the two triangles clearly have area. Signed area cancels. If you wanted the total <em>painted</em> area you would add the sizes, 4, but the integral answers a different question: the net total, the way a bank balance nets deposits against withdrawals.</p>
  <Graph fn={(x)=>x} xMin={-2.5} xMax={2.5} yMin={-2.5} yMax={2.5}
    shades={[{top:0,bottom:(x)=>x,from:-2,to:0,color:"rgba(244,114,182,0.28)"},{top:(x)=>x,bottom:0,from:0,to:2,color:"rgba(230,180,90,0.3)"}]}
    caption="Under y = x from -2 to 2: the pink triangle below the axis counts as -2, the gold triangle above counts as +2, so the integral is 0."/>
  <Box color="green"><p><M d="\int_0^3(2x+1)\,dx=12"/> and <M d="\int_{-2}^2 x\,dx=0"/>.</p></Box>
</div>
)},
{type:"practice",render:()=>(<span>If <M d="\displaystyle\int_1^4 f\,dx=7"/> and <M d="\displaystyle\int_1^4 g\,dx=3"/>, find <M d="\displaystyle\int_1^4[2f-g]\,dx"/>.</span>),
answer:()=>(<div>
  <p>You do not need to know what <M d="f"/> and <M d="g"/> actually are. Use the properties to break the integral apart.</p>
  <p><strong>Step 1: Split the sum.</strong></p>
  <M d="\int_1^4[2f-g]\,dx=\int_1^4 2f\,dx-\int_1^4 g\,dx" block/>
  <p><strong>Step 2: Pull the constant 2 out front.</strong></p>
  <M d="=2\int_1^4 f\,dx-\int_1^4 g\,dx" block/>
  <p><strong>Step 3: Plug in the given values.</strong></p>
  <M d="=2(7)-3=14-3=11" block/>
  <Box color="green"><p>Answer: 11. The properties let you work with given totals directly, no actual integration required.</p></Box>
</div>)},
{type:"practice",render:()=>(<span>Evaluate by geometry: <M d="\displaystyle\int_0^4 (4-x)\,dx"/> and <M d="\displaystyle\int_1^3 5\,dx"/>. Then interpret the second one if <M d="5"/> is a cash inflow in thousands of dollars per day and <M d="x"/> is measured in days.</span>),
answer:()=>(<div>
  <p><strong>Part 1: <M d="\int_0^4(4-x)\,dx"/>.</strong> The line <M d="y=4-x"/> starts at height 4 when <M d="x=0"/> and falls to height 0 at <M d="x=4"/>. The region under it is a right triangle with base 4 and height 4:</p>
  <M d="\int_0^4(4-x)\,dx=\tfrac12\times 4\times 4=8" block/>
  <p><strong>Part 2: <M d="\int_1^3 5\,dx"/>.</strong> The curve is the flat line <M d="y=5"/>, so the region is a rectangle 2 wide (from 1 to 3) and 5 tall:</p>
  <M d="\int_1^3 5\,dx=5\times 2=10" block/>
  <p><strong>Interpretation.</strong> Cash flows in at a steady $5,000 per day; from day 1 to day 3 is two days; total collected is $10,000. Rate times time is total, and the integral is the area that computes it.</p>
  <Box color="green"><p><M d="\int_0^4(4-x)\,dx=8"/>; <M d="\int_1^3 5\,dx=10"/>, meaning $10,000 collected over two days.</p></Box>
</div>)},
]},

{slug:"ftc",module:"Integration",title:"Fundamental Theorem of Calculus",time:"11 min",content:[
{type:"concept",label:"The Two Halves of Calculus Are One",render:()=>(
<div>
  <p>This is the single most important result in all of calculus. It connects the two halves of the subject: <strong>antiderivatives</strong> (<Ref to="antiderivatives"/>) and <strong>area</strong> (<Ref to="riemann-sums"/> and <Ref to="definite-integral"/>). It says they are secretly the same thing.</p>
  <p>The astonishing claim: to find the exact area under a curve, you do <em>not</em> need the slow way (thousands of rectangles, then a limit). Instead, you find an antiderivative and subtract two values: plug in the top limit, plug in the bottom limit, subtract.</p>
  <M d="\int_a^b f(x)\,dx = F(b)-F(a)" block/>
  <p>where <M d="F"/> is any antiderivative of <M d="f"/>. The <M d="+C"/> cancels out in the subtraction: using <M d="F(x)+C"/> gives <M d="(F(b)+C)-(F(a)+C)=F(b)-F(a)"/>, so we drop it for definite integrals.</p>
  <p><strong>Here is <em>why</em> it works.</strong> Sweep the right edge of the shaded region slowly from left to right, and let <M d="A(x)"/> stand for "the area collected so far, from <M d="a"/> up to <M d="x"/>." When you nudge that edge a tiny bit further right, the sliver of area you add is almost a thin rectangle: its height is the curve's value <M d="f(x)"/> and its width is the tiny step. So the area grows at the rate <M d="f(x)"/>, which means <M d="A'(x)=f(x)"/>. In other words, the "area-so-far" function is an antiderivative of <M d="f"/>. It is <M d="F(x)"/> up to a constant, and since <M d="A(a)=0"/> (no area collected yet at the start), the area from <M d="a"/> to <M d="b"/> is <M d="A(b)=F(b)-F(a)"/>. That is the whole theorem: the antiderivative <em>is</em> the running-area function, so subtracting its two values gives the area in between.</p>
  <p>Check it on the parabola from <Ref to="riemann-sums"/>, where a thousand rectangles crept toward 2.6667. An antiderivative of <M d="x^2"/> is <M d="\tfrac{x^3}{3}"/>, so</p>
  <M d="\int_0^2 x^2\,dx=\frac{2^3}{3}-\frac{0^3}{3}=\frac{8}{3}\approx 2.6667" block/>
  <p>One line. The limit of all those sums was hiding inside the power rule the whole time.</p>
</div>
)},
{type:"rule",label:"Evaluating a Definite Integral",render:()=>(
<div>
  <p><strong>The 3-step procedure:</strong></p>
  <Box>
    <p>1. Find an antiderivative <M d="F(x)"/> (ignore <M d="+C"/>).</p>
    <p>2. Plug in the top limit to get <M d="F(b)"/>, then the bottom to get <M d="F(a)"/>.</p>
    <p>3. Subtract: <M d="F(b)-F(a)"/>.</p>
  </Box>
  <p>The bracket notation <M d="\big[F(x)\big]_a^b"/> is shorthand for "evaluate <M d="F"/> at <M d="b"/> minus <M d="F"/> at <M d="a"/>."</p>
  <p><strong>The business form of the theorem:</strong> the integral of a rate is the total change.</p>
  <M d="\int_a^b C'(x)\,dx=C(b)-C(a)" block/>
  <p>The area under marginal cost from <M d="a"/> to <M d="b"/> is the cost of producing units <M d="a"/> through <M d="b"/>; likewise for marginal revenue and marginal profit.</p>
</div>
)},
{type:"example",label:"Top Minus Bottom",render:()=>(
<div>
  <p>Find <M d="\int_0^2 4x\,dx"/>.</p>
  <p><strong>Step 1: Antiderivative.</strong> <M d="\int 4x\,dx=2x^2"/>.</p>
  <p><strong>Step 2: Evaluate at both limits.</strong></p>
  <M d="\big[2x^2\big]_0^2 = 2(2)^2 - 2(0)^2" block/>
  <p><strong>Step 3: Subtract.</strong></p>
  <M d="= 8 - 0 = 8" block/>
  <Graph fn={(x)=>4*x} xMin={-0.5} xMax={3} yMin={-1} yMax={10} shades={[{top:(x)=>4*x,bottom:0,from:0,to:2,color:"rgba(230,180,90,0.3)"}]} caption="The shaded area under y = 4x from 0 to 2 is a triangle: half base times height is (1/2)(2)(8) = 8. The theorem agrees."/>
  <Box color="green"><p>Answer: 8. Geometry (triangle area) confirms it.</p></Box>
</div>
)},
{type:"example",label:"A Rate Adds Up to a Total",render:()=>(
<div>
  <p>The factory from <Ref to="marginal"/> has marginal cost <M d="C'(x)=25-0.1x"/> dollars per item. What does it cost to produce items 51 through 100?</p>
  <p><strong>Step 1: Set up the integral.</strong> Total change in cost from 50 items to 100 items is the integral of the rate:</p>
  <M d="\int_{50}^{100}(25-0.1x)\,dx" block/>
  <p><strong>Step 2: Antiderivative.</strong> <M d="F(x)=25x-0.05x^2"/>.</p>
  <p><strong>Step 3: Evaluate and subtract.</strong></p>
  <M d="F(100)=2500-500=2000\qquad F(50)=1250-125=1125" block/>
  <M d="\int_{50}^{100}(25-0.1x)\,dx=2000-1125=875\text{ dollars}" block/>
  <p><strong>Check against the past.</strong> In <Ref to="derivative"/> we computed the average rate of change of this very cost function from 50 to 100 and found <M d="C(100)-C(50)=875"/>, using the full cost function. Here we got the same 875 from the marginal cost alone, without ever knowing the fixed cost. The integral of the rate recovered the total change exactly.</p>
  <Box color="green"><p>Items 51 through 100 cost $875 in total. Area under marginal cost is cost.</p></Box>
</div>
)},
{type:"practice",render:()=>(<span>Find <M d="\displaystyle\int_1^2(3x^2+2x)\,dx"/></span>),
answer:()=>(<div>
  <p><strong>Step 1: Find the antiderivative.</strong></p>
  <Box><p><M d="3x^2"/>: exponent <M d="2+1=3"/>, divide by 3, giving <M d="x^3"/></p><p><M d="2x"/>: exponent <M d="1+1=2"/>, divide by 2, giving <M d="x^2"/></p></Box>
  <M d="F(x)=x^3+x^2" block/>
  <p><strong>Step 2: Plug in the top (2) and the bottom (1).</strong></p>
  <M d="F(2)=2^3+2^2=8+4=12" block/>
  <M d="F(1)=1^3+1^2=1+1=2" block/>
  <p><strong>Step 3: Subtract.</strong></p>
  <M d="F(2)-F(1)=12-2=10" block/>
  <Box color="green"><p>Answer: 10.</p></Box>
</div>)},
{type:"practice",render:()=>(<span>A company's marginal revenue is <M d="R'(x)=80-0.2x"/> dollars per unit. How much revenue comes from selling units 101 through 200?</span>),
answer:()=>(<div>
  <p><strong>Step 1: Set up.</strong> Total change in revenue from 100 units to 200 units:</p>
  <M d="\int_{100}^{200}(80-0.2x)\,dx" block/>
  <p><strong>Step 2: Antiderivative.</strong> <M d="F(x)=80x-0.1x^2"/>.</p>
  <p><strong>Step 3: Evaluate and subtract.</strong></p>
  <M d="F(200)=16000-4000=12000\qquad F(100)=8000-1000=7000" block/>
  <M d="\int_{100}^{200}(80-0.2x)\,dx=12000-7000=5{,}000\text{ dollars}" block/>
  <p>Sanity check: the marginal revenue over this stretch runs from <M d="R'(100)=60"/> down to <M d="R'(200)=40"/>, averaging about $50 per unit, times 100 units, is about $5,000. It fits.</p>
  <Box color="green"><p>Units 101 through 200 bring in $5,000. (In <Ref to="antiderivatives"/> this same marginal revenue integrated to <M d="R(x)=80x-0.1x^2"/>; here the limits turned that function into a single number.)</p></Box>
</div>)},
]},

{slug:"integration-by-parts",module:"Integration",title:"Integration by Parts",time:"12 min",content:[
{type:"concept",label:"The Product Rule, Run Backwards",render:()=>(
<div>
  <p>Substitution (<Ref to="substitution"/>) undoes the chain rule. Some integrals do not come from a chain rule at all: <M d="\int x\,e^x\,dx"/>, for instance, has no inner function whose derivative sits alongside it. Try <M d="u=x"/> and the <M d="e^x"/> does not turn into anything useful; try <M d="u=e^x"/> and you need an <M d="e^x\,dx"/>, which is not there. Substitution stalls.</p>
  <p>The clue is that <M d="x\,e^x"/> is a <em>product</em>, so the rule to run backwards is the product rule (<Ref to="product-quotient"/>). Here is the whole derivation, three lines.</p>
  <p><strong>Line 1.</strong> The product rule says</p>
  <M d="(u\cdot v)'=u'v+uv'" block/>
  <p><strong>Line 2.</strong> Integrate both sides. The left side is the derivative of <M d="uv"/>, and integrating a derivative gives the thing back:</p>
  <M d="uv=\int u'v\,dx+\int uv'\,dx" block/>
  <p><strong>Line 3.</strong> Move one integral to the other side:</p>
  <M d="\int u\,v'\,dx=uv-\int v\,u'\,dx" block/>
  <p>That is <strong>integration by parts</strong>. In the compact notation where <M d="dv=v'\,dx"/> and <M d="du=u'\,dx"/>:</p>
  <M d="\int u\,dv=uv-\int v\,du" block/>
  <p>Read it as a trade. You hand over one integral, <M d="\int u\,dv"/>, and receive a finished piece, <M d="uv"/>, plus a <em>different</em> integral, <M d="\int v\,du"/>. The trade is worth making when the new integral is easier than the old one.</p>
  <p><strong>Choosing <M d="u"/>.</strong> Since the new integral contains <M d="du"/>, pick <M d="u"/> to be the piece that gets <em>simpler</em> when differentiated. A power of <M d="x"/> is ideal: <M d="x"/> becomes 1 and vanishes from the problem. A logarithm is also a good <M d="u"/>, because <M d="\ln x"/> becomes <M d="\tfrac1x"/>. Whatever is left is <M d="dv"/>, and it must be something you can integrate, like <M d="e^x"/> or a power of <M d="x"/>.</p>
</div>
)},
{type:"rule",label:"Integration by Parts",render:()=>(
<div>
  <M d="\int u\,dv=uv-\int v\,du" block/>
  <p><strong>Definite version:</strong> evaluate the <M d="uv"/> piece at both limits, then subtract the remaining integral over the same limits:</p>
  <M d="\int_a^b u\,dv=\big[uv\big]_a^b-\int_a^b v\,du" block/>
  <p><strong>Choosing <M d="u"/>:</strong> the piece that simplifies when differentiated (a power of <M d="x"/>, or <M d="\ln x"/>). Then <M d="dv"/> is everything else, including the <M d="dx"/>, and it must be integrable.</p>
  <p><strong>Always check</strong> by differentiating your answer.</p>
</div>
)},
{type:"example",label:"The Classic Case",render:()=>(
<div>
  <p>Find <M d="\int x\,e^x\,dx"/>.</p>
  <p><strong>Step 1: Choose.</strong> <M d="x"/> simplifies when differentiated, so <M d="u=x"/>, which leaves <M d="dv=e^x\,dx"/>.</p>
  <p><strong>Step 2: Find <M d="du"/> and <M d="v"/>.</strong> <M d="du=dx"/>. And <M d="v"/> is the antiderivative of <M d="dv"/>: <M d="v=e^x"/> (no <M d="+C"/> needed here; any one antiderivative works).</p>
  <p><strong>Step 3: Apply the formula.</strong></p>
  <M d="\int x\,e^x\,dx=x\,e^x-\int e^x\,dx" block/>
  <p>The new integral is just <M d="\int e^x\,dx=e^x"/>, which we know cold. The trade paid off.</p>
  <M d="\int x\,e^x\,dx=x\,e^x-e^x+C" block/>
  <p><strong>Step 4: Check by differentiating.</strong> Product rule on <M d="x\,e^x"/> gives <M d="e^x+x\,e^x"/>; the derivative of <M d="-e^x"/> is <M d="-e^x"/>. Total: <M d="x\,e^x"/>. Correct.</p>
  <Box color="green"><p><M d="\int x\,e^x\,dx=x\,e^x-e^x+C=e^x(x-1)+C"/>.</p></Box>
</div>
)},
{type:"example",label:"Integrating a Logarithm",render:()=>(
<div>
  <p>Find <M d="\int\ln x\,dx"/>. This looks like it has only one piece, so where is the product?</p>
  <p><strong>Step 1: Choose.</strong> The trick is to see <M d="\ln x"/> as <M d="\ln x\cdot 1"/>. Let <M d="u=\ln x"/> (it simplifies to <M d="\tfrac1x"/> when differentiated), which leaves <M d="dv=1\,dx"/>.</p>
  <p><strong>Step 2: Find <M d="du"/> and <M d="v"/>.</strong> <M d="du=\tfrac{1}{x}\,dx"/> and <M d="v=x"/>.</p>
  <p><strong>Step 3: Apply the formula.</strong></p>
  <M d="\int\ln x\,dx=x\ln x-\int x\cdot\frac{1}{x}\,dx=x\ln x-\int 1\,dx" block/>
  <p>The <M d="x"/> and the <M d="\tfrac1x"/> cancel, leaving the easiest integral there is.</p>
  <M d="\int\ln x\,dx=x\ln x-x+C" block/>
  <p><strong>Check.</strong> Differentiate <M d="x\ln x"/> with the product rule: <M d="\ln x+x\cdot\tfrac1x=\ln x+1"/>. Then <M d="-x"/> contributes <M d="-1"/>. Total: <M d="\ln x"/>. Correct.</p>
  <p><strong>A definite version.</strong> Compute <M d="\int_1^e\ln x\,dx"/>:</p>
  <M d="\big[x\ln x-x\big]_1^e=(e\ln e-e)-(1\ln 1-1)=(e-e)-(0-1)=1" block/>
  <p>(Using <M d="\ln e=1"/> and <M d="\ln 1=0"/> from <Ref to="logarithms"/>.) The area under the log curve from 1 to <M d="e"/> is exactly 1, one of the small pleasures of the number <M d="e"/>.</p>
  <Box color="green"><p><M d="\int\ln x\,dx=x\ln x-x+C"/>, and <M d="\int_1^e\ln x\,dx=1"/>.</p></Box>
</div>
)},
{type:"example",label:"Where It Shows Up in Business",render:()=>(
<div>
  <p>Income streams (<Ref to="income-streams"/>) are valued by discounting each moment's income back to today, which means integrating (income rate) times <M d="e^{-rt}"/>. If the income rate is a constant, substitution handles it. But real income often <em>grows</em>. Suppose a new product's revenue rate is <M d="1000t"/> dollars per year (starting at zero and growing by $1,000 per year each year) for 5 years, discounted at 5%. Its present value is</p>
  <M d="PV=\int_0^5 1000t\,e^{-0.05t}\,dt" block/>
  <p>The integrand is <M d="t"/> times <M d="e^{-0.05t}"/>, a product. Parts.</p>
  <p><strong>Step 1: Choose.</strong> <M d="u=1000t"/> (simplifies to a constant), <M d="dv=e^{-0.05t}\,dt"/>.</p>
  <p><strong>Step 2: <M d="du"/> and <M d="v"/>.</strong> <M d="du=1000\,dt"/>. For <M d="v"/>, integrate <M d="e^{-0.05t}"/> with the <M d="e^{kt}"/> shortcut from <Ref to="substitution"/>: <M d="v=\tfrac{e^{-0.05t}}{-0.05}=-20e^{-0.05t}"/>.</p>
  <p><strong>Step 3: Apply the definite formula.</strong></p>
  <M d="PV=\Big[1000t\cdot(-20e^{-0.05t})\Big]_0^5-\int_0^5(-20e^{-0.05t})(1000)\,dt" block/>
  <M d="=\Big[-20000\,t\,e^{-0.05t}\Big]_0^5+20000\int_0^5 e^{-0.05t}\,dt" block/>
  <p><strong>Step 4: Evaluate each piece.</strong> First bracket: at <M d="t=5"/> it is <M d="-100000\,e^{-0.25}"/>; at <M d="t=0"/> it is 0. So the bracket is <M d="-100000\,e^{-0.25}"/>. Second piece: <M d="\int_0^5 e^{-0.05t}\,dt=\big[-20e^{-0.05t}\big]_0^5=-20e^{-0.25}+20=20(1-e^{-0.25})"/>.</p>
  <M d="PV=-100000\,e^{-0.25}+400000\,(1-e^{-0.25})" block/>
  <p><strong>Step 5: Numbers.</strong> <M d="e^{-0.25}\approx 0.778801"/>:</p>
  <M d="PV\approx-77880.1+400000(0.221199)\approx-77880.1+88479.7\approx\$10{,}600" block/>
  <p>Sanity check: the undiscounted total is <M d="\int_0^5 1000t\,dt=\tfrac{1000\cdot 25}{2}=12{,}500"/>, so discounting knocked off about 15%, reasonable for money arriving over five years at 5%.</p>
  <Box color="green"><p>The growing stream is worth about $10,600 today. Integration by parts is what makes growing income streams computable.</p></Box>
</div>
)},
{type:"practice",render:()=>(<span>Find <M d="\int x\,e^{2x}\,dx"/></span>),
answer:()=>(<div>
  <p><strong>Step 1: Choose.</strong> <M d="u=x"/>, <M d="dv=e^{2x}\,dx"/>.</p>
  <p><strong>Step 2: <M d="du"/> and <M d="v"/>.</strong> <M d="du=dx"/>; <M d="v=\int e^{2x}\,dx=\tfrac{e^{2x}}{2}"/> (the <M d="e^{kx}"/> shortcut with <M d="k=2"/>).</p>
  <p><strong>Step 3: Formula.</strong></p>
  <M d="\int x\,e^{2x}\,dx=x\cdot\frac{e^{2x}}{2}-\int\frac{e^{2x}}{2}\,dx" block/>
  <p><strong>Step 4: Finish the easy integral.</strong> <M d="\int\tfrac{e^{2x}}{2}\,dx=\tfrac12\cdot\tfrac{e^{2x}}{2}=\tfrac{e^{2x}}{4}"/>:</p>
  <M d="\int x\,e^{2x}\,dx=\frac{x\,e^{2x}}{2}-\frac{e^{2x}}{4}+C" block/>
  <p><strong>Check.</strong> Differentiate <M d="\tfrac{x e^{2x}}{2}"/>: product rule gives <M d="\tfrac{e^{2x}}{2}+\tfrac{x\cdot 2e^{2x}}{2}=\tfrac{e^{2x}}{2}+x\,e^{2x}"/>. Differentiate <M d="-\tfrac{e^{2x}}{4}"/>: <M d="-\tfrac{2e^{2x}}{4}=-\tfrac{e^{2x}}{2}"/>. Total: <M d="x\,e^{2x}"/>. Correct.</p>
  <Box color="green"><p><M d="\int x\,e^{2x}\,dx=\dfrac{x\,e^{2x}}{2}-\dfrac{e^{2x}}{4}+C"/>.</p></Box>
</div>)},
{type:"practice",render:()=>(<span>Evaluate <M d="\displaystyle\int_1^4 x\ln x\,dx"/>, giving an exact form and a decimal.</span>),
answer:()=>(<div>
  <p><strong>Step 1: Choose.</strong> Both pieces are candidates for <M d="u"/>, but <M d="\ln x"/> is the one we cannot easily integrate, so it must be <M d="u"/>: <M d="u=\ln x"/>, <M d="dv=x\,dx"/>.</p>
  <p><strong>Step 2: <M d="du"/> and <M d="v"/>.</strong> <M d="du=\tfrac{1}{x}\,dx"/>; <M d="v=\tfrac{x^2}{2}"/>.</p>
  <p><strong>Step 3: Definite formula.</strong></p>
  <M d="\int_1^4 x\ln x\,dx=\Big[\frac{x^2}{2}\ln x\Big]_1^4-\int_1^4\frac{x^2}{2}\cdot\frac{1}{x}\,dx=\Big[\frac{x^2}{2}\ln x\Big]_1^4-\int_1^4\frac{x}{2}\,dx" block/>
  <p><strong>Step 4: Evaluate.</strong> The bracket: at 4, <M d="8\ln 4"/>; at 1, <M d="\tfrac12\ln 1=0"/>. So the bracket is <M d="8\ln 4"/>. The remaining integral: <M d="\big[\tfrac{x^2}{4}\big]_1^4=4-\tfrac14=3.75"/>.</p>
  <M d="\int_1^4 x\ln x\,dx=8\ln 4-3.75" block/>
  <p><strong>Step 5: Decimal.</strong> <M d="\ln 4\approx 1.3863"/>, so <M d="8\ln 4\approx 11.0904"/>, and the answer is about <M d="11.0904-3.75=7.3404"/>.</p>
  <Box color="green"><p><M d="8\ln 4-\tfrac{15}{4}\approx 7.340"/>.</p></Box>
</div>)},
]},

{slug:"area-between-curves",module:"Business Applications",title:"Area Between Curves",time:"8 min",content:[
{type:"concept",render:()=>(
<div>
  <p>A single integral gives the area between a curve and the x-axis. But business problems usually compare <em>two</em> curves: revenue versus cost, demand versus supply, this year's sales versus last year's. The gap between them is what matters, and that gap is an <strong>area between curves</strong>.</p>
  <p>The idea is simple. Picture slicing the region into thin vertical strips. A strip at position <M d="x"/> has height (top curve) minus (bottom curve) and a tiny width <M d="dx"/>, so its area is <M d="[\text{top}-\text{bottom}]\cdot dx"/>  -  just height times width, like any rectangle. Add up the areas of all the strips from <M d="a"/> to <M d="b"/> and you get the whole region. That tiny width <M d="dx"/> is what turns a height (a length) into an area, and adding infinitely many of them is exactly an integral:</p>
  <M d="\text{Area}=\int_a^b[\text{top}-\text{bottom}]\,dx" block/>
  <p>Get the order right. If you subtract the wrong way you get a negative number; the fix is just to swap them, since real area is positive.</p>
</div>
)},
{type:"rule",render:()=>(<div><p><strong>The procedure:</strong></p><p>1. Sketch or test a point to see which curve is on top.</p><p>2. If you are not given the interval, find where the curves cross by setting them equal.</p><p>3. Integrate (top minus bottom) across the interval.</p></div>)},
{type:"example",label:"Finding the Interval Yourself",render:()=>(
<div>
  <p>Find the area between <M d="y=x"/> and <M d="y=x^2"/>.</p>
  <p><strong>Step 1: Where do they cross?</strong> Set them equal:</p>
  <M d="x=x^2\;\Rightarrow\;x^2-x=0\;\Rightarrow\;x(x-1)=0\;\Rightarrow\;x=0,\,1" block/>
  <p>That last step uses the fact that a product is zero only when one of its factors is zero, so either <M d="x=0"/> or <M d="x-1=0"/> (giving <M d="x=1"/>).</p>
  <p>So the region runs from <M d="x=0"/> to <M d="x=1"/>.</p>
  <p><strong>Step 2: Which is on top?</strong> Test <M d="x=0.5"/>: the line gives <M d="0.5"/>, the parabola gives <M d="0.25"/>. The line <M d="y=x"/> is on top.</p>
  <p><strong>Step 3: Integrate top minus bottom.</strong></p>
  <M d="\int_0^1(x-x^2)\,dx=\Big[\frac{x^2}{2}-\frac{x^3}{3}\Big]_0^1=\frac{1}{2}-\frac{1}{3}=\frac{1}{6}" block/>
  <Graph fns={[(x)=>x,(x)=>x*x]} xMin={-0.3} xMax={1.4} yMin={-0.3} yMax={1.5} shades={[{top:(x)=>x,bottom:(x)=>x*x,from:0,to:1,color:"rgba(99,102,241,0.28)"}]} caption="Between x=0 and x=1 the line (blue) sits above the parabola (pink). The shaded sliver is the area we found, 1/6."/>
  <Box color="green"><p>Area = <M d="\tfrac{1}{6}\approx 0.167"/>.</p></Box>
</div>
)},
{type:"practice",render:()=>(<span>Find the area between <M d="y=6-x^2"/> and <M d="y=2"/> on <M d="[-2,2]"/>.</span>),
answer:()=>(<div>
  <p><strong>Step 1: Which curve is on top?</strong> Test <M d="x=0"/>: the parabola gives <M d="6"/>, the line gives <M d="2"/>. So <M d="6-x^2"/> is on top.</p>
  <p><strong>Step 2: Set up top minus bottom.</strong></p>
  <M d="\int_{-2}^{2}\big[(6-x^2)-2\big]\,dx=\int_{-2}^{2}(4-x^2)\,dx" block/>
  <p><strong>Step 3: Integrate and evaluate.</strong></p>
  <M d="\Big[4x-\frac{x^3}{3}\Big]_{-2}^{2}=\Big(8-\tfrac{8}{3}\Big)-\Big(-8+\tfrac{8}{3}\Big)=\frac{16}{3}+\frac{16}{3}=\frac{32}{3}" block/>
  <Graph fns={[(x)=>6-x*x,()=>2]} xMin={-2.4} xMax={2.4} yMin={-1} yMax={7} shades={[{top:(x)=>6-x*x,bottom:2,from:-2,to:2,color:"rgba(99,102,241,0.28)"}]} caption="On the interval from -2 to 2 the blue parabola stays above the pink line. The shaded region is the area we computed, 32/3."/>
  <Box color="green"><p>Area = <M d="\tfrac{32}{3}\approx 10.67"/>.</p></Box>
</div>)},
]},

{slug:"surplus",module:"Business Applications",title:"Consumer & Producer Surplus",time:"10 min",content:[
{type:"concept",render:()=>(
<div>
  <p>This is one of the most useful ideas in microeconomics, and it is pure area-between-curves. It measures the hidden "bonus" value that buyers and sellers walk away with at the market price.</p>
  <Box>
    <p><strong>Consumer Surplus (CS):</strong> some buyers would happily have paid more than the market price. The money they <em>saved</em> compared to what they were willing to pay is their surplus. On a graph it is the area below the demand curve and above the price line.</p>
    <p>Here is why that saved money <em>is</em> an area. Take the buyers one unit at a time. The buyer of the very first unit was willing to pay <M d="D(0)"/> (the top of the demand curve) but pays only the market price <M d="\bar p"/>, so on that unit they pocket <M d="D(0)-\bar p"/> in savings. Each later unit's buyer would have paid a little less but still pays only <M d="\bar p"/>, saving <M d="D(x)-\bar p"/>. Add up the savings on every unit from 0 to the equilibrium quantity  -  and adding a smoothly changing quantity across an interval is exactly an integral  -  and the total is the area between the demand curve and the price line. The "money saved" and the "area" are the same thing, measured in dollars because it is a price-per-unit times a number of units.</p>
  </Box>
  <Box>
    <p><strong>Producer Surplus (PS):</strong> some sellers would have accepted less than the market price. The extra they <em>earned</em> above their minimum is their surplus. It is the area above the supply curve and below the price line.</p>
    <p>By the same unit-by-unit reasoning, each unit earns its seller <M d="\bar p-S(x)"/> above the minimum they would have accepted, and summing those gains from 0 to the equilibrium quantity is the area between the price line and the supply curve.</p>
  </Box>
  <Box>
    <p>Two quick definitions, since we will not assume them. A <strong>demand curve</strong> <M d="D(x)"/> answers: for a given quantity <M d="x"/>, what is the highest price a buyer is willing to pay for that unit? It slopes down (people pay less as more is sold). A <strong>supply curve</strong> <M d="S(x)"/> answers: what is the lowest price a seller will accept for that unit? It slopes up (making more units costs more  -  think overtime and pricier materials  -  so sellers need a higher price to justify each extra unit). Note the setup here: <M d="x"/> is the <em>quantity</em>, and each function hands back a <em>price</em>.</p>
  </Box>
  <p>Everything is anchored at the <strong>equilibrium</strong>: the single <M d="(\text{quantity},\,\text{price})"/> point where demand and supply meet, so the amount buyers want exactly equals the amount sellers offer.</p>
</div>
)},
{type:"rule",render:()=>(
<div>
  <p><strong>Step 1:</strong> Find equilibrium by setting demand equal to supply, <M d="D(x)=S(x)"/>. Solve for the quantity <M d="\bar x"/>, then plug it back in to get the price <M d="\bar p"/>.</p>
  <p><strong>Step 2:</strong> Each surplus is an area between the curve and the horizontal price line:</p>
  <M d="CS=\int_0^{\bar x}\big[D(x)-\bar p\big]\,dx" block/>
  <M d="PS=\int_0^{\bar x}\big[\bar p-S(x)\big]\,dx" block/>
  <p>Demand is on top for CS; the price is on top for PS. Both are just "top minus bottom" again.</p>
</div>
)},
{type:"practice",render:()=>(<span>Given demand <M d="D(x)=50-0.1x"/> and supply <M d="S(x)=10+0.1x"/>, find the equilibrium and both surpluses.</span>),
answer:()=>(<div>
  <p><strong>Step 1: Equilibrium.</strong> Set demand equal to supply:</p>
  <M d="50-0.1x=10+0.1x\;\Rightarrow\;40=0.2x\;\Rightarrow\;\bar x=200" block/>
  <p>Price at equilibrium: <M d="\bar p=10+0.1(200)=\$30"/>.</p>
  <p><strong>Step 2: Consumer surplus.</strong> Demand minus price:</p>
  <M d="CS=\int_0^{200}\big[(50-0.1x)-30\big]\,dx=\int_0^{200}(20-0.1x)\,dx" block/>
  <M d="=\big[20x-0.05x^2\big]_0^{200}=4000-2000=\$2{,}000" block/>
  <p><strong>Step 3: Producer surplus.</strong> Price minus supply:</p>
  <M d="PS=\int_0^{200}\big[30-(10+0.1x)\big]\,dx=\int_0^{200}(20-0.1x)\,dx=\$2{,}000" block/>
  <Graph fns={[(x)=>50-0.1*x,(x)=>10+0.1*x]} xMin={-8} xMax={300} yMin={0} yMax={55}
    shades={[
      {top:(x)=>50-0.1*x,bottom:30,from:0,to:200,color:"rgba(99,102,241,0.30)"},
      {top:30,bottom:(x)=>10+0.1*x,from:0,to:200,color:"rgba(16,185,129,0.26)"}
    ]}
    hlines={[{y:30,x1:0,x2:200,color:"#fbbf24"}]}
    notes={[{x:80,y:41,text:"Consumer surplus",color:"#c7d2fe"},{x:80,y:19,text:"Producer surplus",color:"#a7f3d0"}]}
    highlights={[{x:200,y:30,label:"equilibrium",color:"#f59e0b",lo:[8,-12]}]}
    xlab="Quantity" ylab="Price ($)"
    caption="Consumer surplus (indigo) lies below the demand line and above the $30 price line. Producer surplus (green) lies above the supply line and below the $30 price line. Both end at the equilibrium quantity of 200."/>
  <Box color="green"><p>Equilibrium: 200 units at $30. Consumer surplus = producer surplus = $2,000.</p>
  <p>They came out equal here only because the demand and supply curves are equally steep (slopes <M d="-0.1"/> and <M d="+0.1"/>), which made the two integrals identical. In general consumer and producer surplus are different  -  do not expect them to match.</p></Box>
</div>)},
]},

{slug:"income-streams",module:"Business Applications",title:"Income Streams & Present Value",time:"10 min",content:[
{type:"concept",render:()=>(
<div>
  <p>This lesson ties together everything: integration, the exponential function, and a core finance idea. It answers a question every investor asks: <strong>what is a future stream of money worth today?</strong></p>
  <p>A dollar arriving five years from now is worth less than a dollar today, because today's dollar could be invested and grow. In <Ref to="exponentials"/> we found that under continuous compounding a dollar invested today grows to <M d="e^{rt}"/> dollars after <M d="t"/> years. Present value runs that in reverse: if a dollar today becomes <M d="e^{rt}"/> dollars later, then a dollar that arrives later is worth only <M d="\tfrac{1}{e^{rt}}=e^{-rt}"/> dollars today  -  you <em>divide</em> by the growth factor to undo the growth. That dividing-back is what <strong>discounting</strong> means, and <M d="e^{-rt}"/> is called the discount factor. The minus sign in the exponent is simply growth run backwards.</p>
  <p>What does earning money "continuously" mean? Picture income flowing like water from a tap, instead of arriving in monthly lumps. A <strong>continuous income stream</strong> has a flow rate <M d="f(t)"/>  -  dollars per year at the instant <M d="t"/>, just as speed is miles per hour at an instant. Over a tiny slice of time <M d="dt"/> years you actually receive <M d="f(t)\,dt"/> dollars (rate times time, the same way speed times time gives distance). Each tiny payment is then pulled back to today's value by multiplying by <M d="e^{-rt}"/>, giving <M d="f(t)\,e^{-rt}\,dt"/>. Adding up every tiny slice from now (<M d="t=0"/>) to year <M d="T"/> is an integral:</p>
  <M d="PV=\int_0^T f(t)\,e^{-rt}\,dt" block/>
  <p>Here <M d="r"/> is the annual rate (as a decimal) and <M d="T"/> is the number of years.</p>
</div>
)},
{type:"rule",render:()=>(
<div>
  <p>When the income is a <strong>constant</strong> rate <M d="f(t)=R"/> dollars per year, the integral works out to a clean formula:</p>
  <M d="PV=\int_0^T R\,e^{-rt}\,dt=\frac{R\,(1-e^{-rT})}{r}" block/>
  <p>Memorize this shape: a constant times one minus a decay term, all divided by the rate. It saves you from redoing the integral each time.</p>
</div>
)},
{type:"example",label:"Where the Formula Comes From",render:()=>(
<div>
  <p>Quick derivation so the formula is not magic. Integrate <M d="R\,e^{-rt}"/> from 0 to <M d="T"/>:</p>
  <M d="\int_0^T R\,e^{-rt}\,dt=R\cdot\Big[\frac{e^{-rt}}{-r}\Big]_0^T" block/>
  <p>Plug in top minus bottom:</p>
  <M d="=R\left(\frac{e^{-rT}}{-r}-\frac{e^{0}}{-r}\right)=R\cdot\frac{1-e^{-rT}}{r}" block/>
  <p>That is the formula in the rule above. The <M d="e^{-rt}"/> integrates with the substitution from <Ref to="substitution"/>  -  and you can confirm the antiderivative by differentiating <M d="\tfrac{e^{-rt}}{-r}"/>, which hands back <M d="e^{-rt}"/>.</p>
</div>
)},
{type:"practice",render:()=>(<span>An investment pays $10,000 per year continuously for 5 years. At a 6% discount rate, what is its present value?</span>),
answer:()=>(<div>
  <p><strong>Step 1: Identify the pieces.</strong> Constant income, so use the shortcut: <M d="R=10000"/>, <M d="T=5"/>, <M d="r=0.06"/>.</p>
  <M d="PV=\frac{10000\,(1-e^{-0.06\cdot 5})}{0.06}=\frac{10000\,(1-e^{-0.3})}{0.06}" block/>
  <p><strong>Step 2: Evaluate the decay term.</strong> <M d="e^{-0.3}\approx 0.7408"/>, so <M d="1-0.7408=0.2592"/>.</p>
  <p><strong>Step 3: Finish the arithmetic.</strong></p>
  <M d="PV=\frac{10000\,(0.2592)}{0.06}=\frac{2592}{0.06}=\$43{,}200" block/>
  <Graph fn={(t)=>10000*Math.exp(-0.06*t)} xMin={0} xMax={5.5} yMin={0} yMax={11000}
    shades={[{top:(t)=>10000*Math.exp(-0.06*t),bottom:0,from:0,to:5,color:"rgba(99,102,241,0.30)"}]}
    highlights={[{x:0,y:10000,label:"rate now: $10K/yr",color:"#f59e0b",lo:[10,-14]},{x:5,y:7408,label:"discounted: $7,408/yr",color:"#10b981",lo:[-44,18]}]}
    notes={[{x:2.5,y:4200,text:"Area = present value",color:"#c7d2fe"}]}
    xlab="Years" ylab="$ per year"
    caption="This is the pay-rate curve after discounting. The shaded area under it from year 0 to year 5 is the present value, about $43,200."/>
  <Box color="green"><p>Present value is about $43,200. The undiscounted total is $50,000, but future dollars are worth less, so today's value is lower.</p></Box>
</div>)},
]},
  ];
}

export const QUIZ = {
 "functions": [
  {
   "q": "The lesson describes a function as a 'machine for numbers.' What does this machine do?",
   "choices": [
    "It takes one number in, follows a fixed rule, and gives one number out",
    "It takes one number in and gives back several different possible answers",
    "It changes its rule each time you use it",
    "It only works with whole numbers"
   ],
   "answer": 0,
   "why": [
    "Exactly right, you feed in one number, the rule runs, and one number comes out.",
    "Not quite, a function gives back exactly one output for each input, never several.",
    "Not this one, the whole point of a function is that the rule stays the same every time.",
    "Not quite, the lesson never limits a function to whole numbers only."
   ]
  },
  {
   "q": "What does the domain of a function mean?",
   "choices": [
    "Every number that can come out of the function",
    "The steepness of the function",
    "Every number you are allowed to put into the function",
    "The rule inside the machine"
   ],
   "answer": 2,
   "why": [
    "Close, but that describes the range, the outputs, not the domain.",
    "Not this one, steepness is a different idea (called slope, coming in the next lesson), not the domain.",
    "Yes, the domain is the set of all inputs you are allowed to feed in.",
    "Not quite, the rule is how the machine works, not its domain."
   ]
  },
  {
   "q": "What is the domain of $f(x)=\\dfrac{10}{x-3}$?",
   "choices": [
    "All real numbers except $x=3$",
    "All real numbers except $x=10$",
    "All real numbers",
    "All real numbers except $x=-3$"
   ],
   "answer": 0,
   "why": [
    "Correct - the denominator $x-3$ equals zero at $x=3$, the one input that jams the machine.",
    "Not quite - the 10 is on top; it is the bottom hitting zero that matters, at $x=3$.",
    "Not quite - this is a fraction, so the input making the bottom zero ($x=3$) must be excluded.",
    "Close - but $x-3=0$ gives $x=3$, not $x=-3$."
   ]
  }
 ],
 "lines": [
  {
   "q": "How is slope defined in the lesson?",
   "choices": [
    "$\\frac{\\text{rise}}{\\text{run}}$, how much $y$ changes divided by how much $x$ changes",
    "$\\frac{\\text{run}}{\\text{rise}}$, how much $x$ changes divided by how much $y$ changes",
    "The point where the line crosses the $y$-axis",
    "The value of $y$ when $x=0$"
   ],
   "answer": 0,
   "why": [
    "Yes, slope is rise over run, the change in $y$ divided by the change in $x$.",
    "So close, but you flipped it; slope is rise over run, not run over rise.",
    "Not quite, that crossing point is the $y$-intercept $b$, not the slope.",
    "Not this one, that describes $b$, the starting value, not the slope."
   ]
  },
  {
   "q": "In the equation $y=mx+b$, what does $b$ represent?",
   "choices": [
    "How steep the line is",
    "The $y$-intercept, where the line crosses the $y$-axis (the value when $x=0$)",
    "How far the line runs to the right",
    "The slope of the line"
   ],
   "answer": 1,
   "why": [
    "Not quite, steepness is the slope $m$, not $b$.",
    "Exactly, $b$ is the $y$-intercept, the starting value of $y$ when $x=0$.",
    "Not this one, $b$ is a height on the $y$-axis, not a sideways distance.",
    "Not quite, the slope is $m$; $b$ is the $y$-intercept."
   ]
  },
  {
   "q": "A line passes through $(0,25)$ and $(5,27.5)$. What is its slope?",
   "choices": [
    "$2.5$",
    "$0.5$",
    "$5$",
    "$-0.5$"
   ],
   "answer": 1,
   "why": [
    "Not quite - that is the rise alone; you still divide by the run of 5.",
    "Correct - rise over run is $\\dfrac{27.5-25}{5-0}=\\dfrac{2.5}{5}=0.5$.",
    "Not quite - 5 is the run (the change in $x$), not the slope.",
    "Not quite - the line is rising, so the slope is positive."
   ]
  }
 ],
 "quadratics": [
  {
   "q": "For $y=x^2-8x+3$, at what $x$ is the vertex?",
   "choices": [
    "$x=8$",
    "$x=4$",
    "$x=-4$",
    "$x=3$"
   ],
   "answer": 1,
   "why": [
    "Not quite - the vertex is at $-\\dfrac{b}{2a}$, and you still have to divide by $2a=2$.",
    "Correct - $x=-\\dfrac{b}{2a}=-\\dfrac{-8}{2}=4$.",
    "Not quite - watch the sign: $-b$ with $b=-8$ gives $+8$, so the vertex is at $+4$.",
    "Not quite - 3 is the constant $c$, which shifts the parabola up or down but does not locate the vertex."
   ]
  },
  {
   "q": "Factor $x^2-9$.",
   "choices": [
    "$(x-3)(x+3)$",
    "$(x-3)^2$",
    "$(x-9)(x+1)$",
    "It does not factor"
   ],
   "answer": 0,
   "why": [
    "Correct - it is a difference of squares, and $(x-3)(x+3)=x^2+3x-3x-9=x^2-9$.",
    "Not quite - $(x-3)^2=x^2-6x+9$, which has a middle term and a $+9$.",
    "Not quite - $(x-9)(x+1)=x^2-8x-9$; the middle term does not cancel.",
    "Not quite - any difference of two squares factors as $(a-b)(a+b)$."
   ]
  },
  {
   "q": "If $(x-2)(x+5)=0$, what are the solutions?",
   "choices": [
    "$x=-2$ or $x=5$",
    "$x=10$",
    "$x=2$ or $x=-5$",
    "$x=3$"
   ],
   "answer": 2,
   "why": [
    "Not quite - set each factor to zero: $x-2=0$ gives $x=2$, and $x+5=0$ gives $x=-5$; the signs flip.",
    "Not quite - a product is zero when a factor is zero, so solve each factor rather than multiplying the numbers.",
    "Correct - the zero-product rule: $x-2=0$ or $x+5=0$, so $x=2$ or $x=-5$.",
    "Not quite - adding the numbers in the factors does not solve the equation; set each factor to zero."
   ]
  }
 ],
 "business-models": [
  {
   "q": "Which statement describes a fixed cost?",
   "choices": [
    "It grows with every unit made, like ingredients",
    "It is the price customers pay for each unit",
    "It is paid even when nothing is produced, like rent",
    "It is revenue minus cost"
   ],
   "answer": 2,
   "why": [
    "Not quite - a cost that grows with each unit is a variable cost.",
    "Not quite - the price customers pay belongs to revenue, not cost.",
    "Correct - fixed costs such as rent are due no matter how many units are made, even zero.",
    "Not quite - revenue minus cost is profit."
   ]
  },
  {
   "q": "The price-demand equation is $p=30-0.05x$. What is the revenue function $R(x)$?",
   "choices": [
    "$R(x)=30x-0.05x^2$",
    "$R(x)=30-0.05x^2$",
    "$R(x)=30x-0.05x$",
    "$R(x)=\\dfrac{30}{x}$"
   ],
   "answer": 0,
   "why": [
    "Correct - revenue is price times quantity: $(30-0.05x)\\,x=30x-0.05x^2$.",
    "Not quite - the 30 must be multiplied by $x$ as well; every term of the price gets multiplied.",
    "Not quite - multiplying $-0.05x$ by $x$ gives $-0.05x^2$, not $-0.05x$.",
    "Not quite - revenue multiplies price by quantity; it never divides."
   ]
  },
  {
   "q": "A business breaks even when:",
   "choices": [
    "Revenue is at its maximum",
    "Revenue equals cost, so profit is zero",
    "Cost is at its minimum",
    "Demand equals supply"
   ],
   "answer": 1,
   "why": [
    "Not quite - maximum revenue is a different point; break-even is about profit being zero.",
    "Correct - break-even means $R(x)=C(x)$, which is the same as $P(x)=0$.",
    "Not quite - cost is lowest at zero output, where the business usually loses money.",
    "Not quite - demand equal to supply is market equilibrium, a different idea."
   ]
  }
 ],
 "exponentials": [
  {
   "q": "A negative exponent means \"one over.\" What is $2^{-3}$?",
   "choices": [
    "$-8$",
    "$\\dfrac{1}{8}$",
    "$-6$",
    "$\\dfrac{1}{6}$"
   ],
   "answer": 1,
   "why": [
    "Not quite - a negative exponent never makes the result negative; it flips it into a fraction.",
    "Correct - $2^{-3}=\\dfrac{1}{2^3}=\\dfrac{1}{8}$, one over the positive power.",
    "Not quite - that treats the exponent as multiplication; $2^{-3}$ means one over $2\\times 2\\times 2$.",
    "Not quite - the denominator is $2^3=8$, not $2\\times 3=6$."
   ]
  },
  {
   "q": "In the exponential function $f(x)=a\\cdot b^{x}$, what does $a$ represent?",
   "choices": [
    "The growth factor you multiply by each period",
    "The time in years",
    "The starting amount (the value when $x=0$)",
    "The interest rate"
   ],
   "answer": 2,
   "why": [
    "Not quite, the growth factor is $b$, the thing you multiply by; $a$ is something else.",
    "Not this one, time is the input $x$, not $a$.",
    "Yes, $a$ is the starting amount, because $f(0)=a\\cdot b^{0}=a$ since $b^{0}=1$.",
    "Not quite, the rate lives inside the growth factor, not in $a$ by itself."
   ]
  },
  {
   "q": "Which power of $x$ equals $\\sqrt{x}$?",
   "choices": [
    "$x^2$",
    "$x^{-1}$",
    "$x^{1/2}$",
    "$2x$"
   ],
   "answer": 2,
   "why": [
    "Not quite - $x^2$ is $x$ squared, the opposite of a square root.",
    "Not quite - $x^{-1}$ is $1/x$; a negative exponent means one over, not a root.",
    "Correct - $x^{1/2}\\cdot x^{1/2}=x^{1}$, so $x^{1/2}$ is the number that squares to $x$: the square root.",
    "Not quite - $2x$ doubles $x$; a square root is a power of $x$, not a multiple of it."
   ]
  }
 ],
 "logarithms": [
  {
   "q": "What is the natural log, $\\ln(x)$, according to the lesson?",
   "choices": [
    "Another name for multiplying by $e$",
    "The reverse of $e^{x}$; they undo each other",
    "The same thing as a square root",
    "A way to make any number positive"
   ],
   "answer": 1,
   "why": [
    "Not quite, $\\ln$ does not multiply by $e$; it reverses raising $e$ to a power.",
    "Exactly, $\\ln(x)$ is the inverse of $e^{x}$, so they cancel each other out.",
    "Not this one, a square root is a different operation entirely.",
    "Not quite, $\\ln$ finds an exponent; it does not just flip signs to positive."
   ]
  },
  {
   "q": "Why can you only take $\\ln$ of a positive number?",
   "choices": [
    "Because $\\ln$ only works on whole numbers",
    "Because negative numbers are too big to handle",
    "Because $e$ raised to any power is always positive, so no exponent can give 0 or a negative result",
    "Because the calculator runs out of digits"
   ],
   "answer": 2,
   "why": [
    "Not quite, $\\ln$ handles fractions and decimals too, not just whole numbers.",
    "Not this one, size is not the issue; the issue is that the result can never be zero or negative.",
    "Exactly, since $e^{?}$ is always positive, no exponent produces 0 or a negative, so $\\ln$ of those does not exist.",
    "Not quite, this has nothing to do with the calculator's digits."
   ]
  },
  {
   "q": "What is the value of $\\ln(1)$?",
   "choices": [
    "$0$, because the exponent that gives 1 is 0 (since $e^{0}=1$)",
    "$1$, because $\\ln$ of any number is itself",
    "$e$, because $\\ln$ always gives back $e$",
    "It is undefined"
   ],
   "answer": 0,
   "why": [
    "Exactly, $\\ln(1)=0$ because $e^{0}=1$, so the exponent that makes 1 is 0.",
    "Not quite, $\\ln$ returns an exponent, not the number itself.",
    "Not this one, $\\ln(e)=1$, but $\\ln$ does not always return $e$.",
    "Not quite, $\\ln(1)$ is perfectly defined; it equals 0."
   ]
  }
 ],
 "limits": [
  {
   "q": "A limit asks one main question. Which is it?",
   "choices": [
    "What number is $f(x)$ getting closer and closer to?",
    "What is the exact value of $f$ at the point?",
    "What is the largest value $f(x)$ ever reaches?",
    "What is the slope of $f(x)$?"
   ],
   "answer": 0,
   "why": [
    "Correct - a limit is about the value the function is heading toward.",
    "Not quite - a limit can exist even when the exact value is undefined, like $\\frac{0}{0}$.",
    "No - a limit is about a destination near one point, not an overall maximum.",
    "That is a derivative, which comes later; a limit is about the destination value."
   ]
  },
  {
   "q": "When you plug a number in and get $\\frac{0}{0}$, what does it tell you?",
   "choices": [
    "The limit is 0.",
    "The limit does not exist.",
    "Simplify the algebra first, then try again.",
    "The function equals infinity there."
   ],
   "answer": 2,
   "why": [
    "No - $\\frac{0}{0}$ does not mean the answer is 0.",
    "Not necessarily - $\\frac{0}{0}$ often hides a perfectly good limit.",
    "Correct - $\\frac{0}{0}$ is a signal to factor, cancel, then plug in again.",
    "No - $\\frac{0}{0}$ is undefined, not infinity; it is just a signal to simplify."
   ]
  },
  {
   "q": "Find $\\displaystyle\\lim_{x\\to 2}\\frac{x^2-4}{x-2}$ by factoring and cancelling.",
   "choices": [
    "$0$",
    "$4$",
    "$2$",
    "It does not exist"
   ],
   "answer": 1,
   "why": [
    "Not quite - $\\frac{0}{0}$ is a signal to simplify, not an answer of 0.",
    "Correct - $\\frac{(x-2)(x+2)}{x-2}=x+2$, and at $x=2$ that is $4$.",
    "Not quite - 2 is the value $x$ approaches, not the limit of the function.",
    "Not quite - after cancelling, the limit is a clean number, $4$."
   ]
  }
 ],
 "infinite-limits": [
  {
   "q": "For $\\lim_{x\\to\\infty}\\frac{3x^2+1}{5x^2-x}$, the top and bottom have the same degree. What is the limit?",
   "choices": [
    "$0$",
    "$\\frac{3}{5}$",
    "$\\infty$",
    "$\\frac{5}{3}$"
   ],
   "answer": 1,
   "why": [
    "No - the limit is 0 only when the top degree is smaller than the bottom.",
    "Correct - same degree means the limit is the ratio of leading coefficients, $\\frac{3}{5}$.",
    "No - it blows up only when the top degree is larger than the bottom.",
    "Careful - the ratio is top over bottom, so it is $\\frac{3}{5}$, not $\\frac{5}{3}$."
   ]
  },
  {
   "q": "What is $\\lim_{x\\to\\infty}\\frac{2x}{x^2+1}$?",
   "choices": [
    "$2$",
    "$\\infty$",
    "$0$",
    "$\\frac{1}{2}$"
   ],
   "answer": 2,
   "why": [
    "No - that would be the ratio only if the top and bottom degrees matched.",
    "No - the bottom grows faster, so the fraction does not blow up.",
    "Correct - the bottom degree is larger, so it crushes the fraction to 0.",
    "No - when the bottom degree is larger the limit is simply 0."
   ]
  },
  {
   "q": "As $x\\to 0^+$ the values of $\\frac{1}{x}$ are $10, 100, 1000, \\dots$ growing without bound, so we write $\\lim_{x\\to 0^+}\\frac{1}{x}=+\\infty$. What does this mean?",
   "choices": [
    "The limit equals the number infinity.",
    "The function grows without bound, so the limit does not exist.",
    "The function levels off at a horizontal line.",
    "The function approaches 0."
   ],
   "answer": 1,
   "why": [
    "No - infinity is not a number, so the limit is not literally equal to it.",
    "Correct - $+\\infty$ describes how the limit fails: the function grows without bound.",
    "No - leveling off is a horizontal asymptote, which happens as $x$ gets large, not here.",
    "No - $\\frac{1}{x}$ approaches 0 as $x$ gets huge, not as $x\\to 0$."
   ]
  }
 ],
 "continuity": [
  {
   "q": "The three-part continuity test at $x=c$ requires that $f(c)$ is defined and that $\\lim_{x\\to c}f(x)$ exists. What is the third condition?",
   "choices": [
    "$\\lim_{x\\to c}f(x)=f(c)$",
    "$f(c)=0$",
    "$f(x)$ must be a polynomial",
    "the limit equals infinity"
   ],
   "answer": 0,
   "why": [
    "Correct - the limit must equal the actual value, with no fakeouts.",
    "No - the value at $c$ does not need to be 0, it just needs to match the limit.",
    "No - many non-polynomials are continuous; the rule is the limit matching the value.",
    "No - an infinite limit means a discontinuity, not continuity."
   ]
  },
  {
   "q": "What is $\\displaystyle\\lim_{x\\to 3}\\frac{x^2-9}{x-3}$?",
   "choices": [
    "$6$",
    "$0$",
    "$3$",
    "It does not exist"
   ],
   "answer": 0,
   "why": [
    "Correct - factor to $\\frac{(x-3)(x+3)}{x-3}=x+3$, which is $6$ at $x=3$.",
    "Not quite - $\\frac{0}{0}$ means simplify first, not that the answer is 0.",
    "Not quite - 3 is the $x$-value; plug it into $x+3$ to get $6$.",
    "Not quite - it cancels to $x+3$, giving a clear limit of $6$."
   ]
  },
  {
   "q": "When you plug in and get a nonzero number over zero (like $\\frac{2}{0}$), what kind of break is it always?",
   "choices": [
    "Vertical asymptote (infinite discontinuity)",
    "Hole (removable discontinuity)",
    "Jump",
    "The function is continuous there"
   ],
   "answer": 0,
   "why": [
    "Correct - a nonzero number over zero always gives a vertical asymptote.",
    "No - a hole comes from $\\frac{0}{0}$, not from a nonzero numerator.",
    "No - a jump comes from the left and right limits disagreeing, not from this.",
    "No - dividing a nonzero number by zero is undefined, so it cannot be continuous."
   ]
  }
 ],
 "derivative": [
  {
   "q": "On a graph, the derivative of a function at a point tells you the curve's:",
   "choices": [
    "Height at that point",
    "Slope (steepness) at that point",
    "Area underneath it",
    "Total distance traveled"
   ],
   "answer": 1,
   "why": [
    "Height is just the $y$-value $f(x)$; the derivative measures how fast that height is changing, not the height itself.",
    "Correct! The derivative is the slope of the curve right at that single point.",
    "Area under a curve is a different idea (integration); the derivative is about steepness.",
    "Total distance is the original function like an odometer; the derivative is more like the speedometer."
   ]
  },
  {
   "q": "In the driving example, which dashboard reading acts like the derivative of your total distance?",
   "choices": [
    "The odometer (total miles)",
    "The fuel gauge",
    "The speedometer (how fast right now)",
    "The clock"
   ],
   "answer": 2,
   "why": [
    "The odometer is the total distance itself, which is the original function, not its rate of change.",
    "The fuel gauge does not measure how fast distance is changing.",
    "Correct! The speedometer shows the instantaneous rate of change of distance, which is exactly the derivative.",
    "The clock measures time, the input, not the rate the distance changes."
   ]
  },
  {
   "q": "For $f(x)=x^2$ the derivative is $f'(x)=2x$. What is the slope of the curve at $x=3$?",
   "choices": [
    "$3$",
    "$9$",
    "$6$",
    "$0$"
   ],
   "answer": 2,
   "why": [
    "Not quite - 3 is the $x$-value; plug it into $f'(x)=2x$.",
    "Not quite - $9$ is the height $f(3)=3^2$, not the slope.",
    "Correct - $f'(3)=2\\times 3=6$.",
    "Not quite - the slope is 0 only at the bottom of the parabola, $x=0$."
   ]
  }
 ],
 "power-rule": [
  {
   "q": "Using the power rule, what is the derivative of $x^5$?",
   "choices": [
    "$x^4$",
    "$5x^6$",
    "$5x^4$",
    "$4x^5$"
   ],
   "answer": 2,
   "why": [
    "You forgot to bring the exponent down as a multiplier; the 5 must move out front.",
    "The exponent should go down by 1 to 4, not up to 6.",
    "Correct! Bring the 5 down in front and subtract 1 from the exponent: $5x^4$.",
    "You wrote the reduced exponent out front but kept the power at 5; instead, bring the current exponent 5 down as the multiplier and reduce the power to 4: $5x^4$."
   ]
  },
  {
   "q": "The power rule says to differentiate $x^n$ you should:",
   "choices": [
    "Add 1 to the exponent and divide by it",
    "Bring the exponent down as a multiplier, then subtract 1 from the exponent",
    "Multiply the exponent by itself",
    "Leave the exponent alone and add 1 out front"
   ],
   "answer": 1,
   "why": [
    "Adding 1 and dividing is the rule for integration, the reverse process, not the derivative.",
    "Correct! That is exactly the power rule: $\\frac{d}{dx}[x^n] = n x^{n-1}$.",
    "Squaring the exponent is not part of any derivative rule.",
    "You must bring the existing exponent down and reduce it by 1, not just add a 1."
   ]
  },
  {
   "q": "Rewrite $\\dfrac{1}{x}$ as a power and differentiate. What is $\\dfrac{d}{dx}\\Big[\\dfrac{1}{x}\\Big]$?",
   "choices": [
    "$\\dfrac{1}{x^2}$",
    "$\\ln x$",
    "$-\\dfrac{1}{x^2}$",
    "$-\\dfrac{1}{x}$"
   ],
   "answer": 2,
   "why": [
    "Not quite - the sign is missing: bringing down the exponent $-1$ makes the result negative.",
    "Not quite - $\\ln x$ is an antiderivative of $\\dfrac{1}{x}$, the reverse direction.",
    "Correct - $\\dfrac{1}{x}=x^{-1}$, so the power rule gives $-1\\cdot x^{-2}=-\\dfrac{1}{x^2}$.",
    "Not quite - the exponent must drop from $-1$ to $-2$, so the answer has $x^2$ underneath."
   ]
  }
 ],
 "tangent-lines": [
  {
   "q": "What is the equation of the tangent line to $y=x^2$ at $x=3$?",
   "choices": [
    "$y=6x-9$",
    "$y=6x+9$",
    "$y=2x-9$",
    "$y=9x-6$"
   ],
   "answer": 0,
   "why": [
    "Correct - the point is $(3,9)$ and the slope is $f'(3)=6$, so $y=9+6(x-3)=6x-9$.",
    "Not quite - check the point: at $x=3$ this line gives $27$, but the curve is at height $9$.",
    "Not quite - the slope of $x^2$ at $x=3$ is $2\\cdot 3=6$, not 2.",
    "Not quite - the slope is $f'(3)=6$ and the intercept comes from the point $(3,9)$."
   ]
  },
  {
   "q": "At a sharp corner, such as the point of $|x|$ at $x=0$, why does the derivative not exist?",
   "choices": [
    "The function is undefined there",
    "The left and right slopes disagree, so no single tangent line fits",
    "The function is negative there",
    "Corners always have slope zero"
   ],
   "answer": 1,
   "why": [
    "Not quite - $|0|=0$ is perfectly defined; the trouble is with the slope, not the value.",
    "Correct - from the left the slope is $-1$ and from the right it is $+1$, and a derivative needs both sides to agree.",
    "Not quite - the absolute value is never negative, and sign has nothing to do with it anyway.",
    "Not quite - a corner has no single slope at all, not a slope of zero."
   ]
  },
  {
   "q": "If $f(2)=5$ and $f'(2)=3$, what does the tangent line estimate for $f(2.1)$?",
   "choices": [
    "$5.03$",
    "$8$",
    "$5.3$",
    "$5.6$"
   ],
   "answer": 2,
   "why": [
    "Not quite - the step is $0.1$, and $3\\times 0.1=0.3$, not $0.03$.",
    "Not quite - that adds the whole slope; multiply the slope by the step of $0.1$ first.",
    "Correct - $f(2.1)\\approx f(2)+f'(2)\\cdot 0.1=5+0.3=5.3$.",
    "Not quite - $0.6$ would be a step of $0.2$; here the step is $0.1$, giving $0.3$."
   ]
  }
 ],
 "marginal": [
  {
   "q": "If $C(x)$ is the total cost to make $x$ items, what does marginal cost $C'(x)$ tell you?",
   "choices": [
    "The approximate cost of producing one more item",
    "The total cost of all the items so far",
    "The average cost per item over all production",
    "The selling price of each item"
   ],
   "answer": 0,
   "why": [
    "Correct! Marginal cost $C'(x)$ estimates the cost of producing the next single item.",
    "Total cost is $C(x)$ itself; the derivative is about the next unit, not the running total.",
    "Average cost divides total cost by quantity, which is a different calculation.",
    "Selling price relates to revenue, not the cost of producing one more item."
   ]
  },
  {
   "q": "A cost function has marginal cost $C'(x)=25-0.10x$. What is the marginal cost at $x=50$?",
   "choices": [
    "$25",
    "$20",
    "$5",
    "$30"
   ],
   "answer": 1,
   "why": [
    "Not quite - you still subtract 0.10 times 50 from 25.",
    "Correct - C'(50) = 25 - 0.10(50) = 25 - 5 = 20 dollars.",
    "Not quite - 5 is only the amount subtracted, not the final marginal cost.",
    "Not quite - marginal cost here decreases as x grows, so it is below 25."
   ]
  },
  {
   "q": "Profit is maximized at the production level where:",
   "choices": [
    "Revenue first becomes positive",
    "Cost is at its lowest",
    "Marginal revenue equals marginal cost, $R'(x) = C'(x)$",
    "You produce as many items as possible"
   ],
   "answer": 2,
   "why": [
    "Revenue turning positive does not by itself locate the largest profit.",
    "Lowest cost usually means making almost nothing, which does not maximize profit.",
    "Correct! Profit peaks where $R'(x) = C'(x)$, the golden rule where the next unit's revenue just matches its cost.",
    "Producing the most possible can push cost above revenue and shrink profit."
   ]
  }
 ],
 "exp-log-derivatives": [
  {
   "q": "What is the derivative of $e^x$?",
   "choices": [
    "$x e^{x-1}$",
    "$e^x$",
    "$\\frac{1}{x}$",
    "$x e^x$"
   ],
   "answer": 1,
   "why": [
    "The power rule does not apply to $e^x$ because the variable is in the exponent, not the base.",
    "Correct! $e^x$ is its own derivative: $\\frac{d}{dx}[e^x] = e^x$.",
    "$\\frac{1}{x}$ is the derivative of $\\ln(x)$, a different function.",
    "There is no extra $x$ multiplier; the derivative of $e^x$ is just $e^x$."
   ]
  },
  {
   "q": "What is the derivative of $\\ln(x)$?",
   "choices": [
    "$\\frac{1}{x}$",
    "$\\ln(x)$",
    "$e^x$",
    "$x$"
   ],
   "answer": 0,
   "why": [
    "Correct! $\\frac{d}{dx}[\\ln x] = \\frac{1}{x}$.",
    "A function is rarely its own derivative; that special property belongs to $e^x$, not $\\ln(x)$.",
    "$e^x$ is the derivative of $e^x$, not of $\\ln(x)$.",
    "The slope of $\\ln(x)$ shrinks as $x$ grows, so it cannot be $x$."
   ]
  },
  {
   "q": "What is the derivative of $4e^x$?",
   "choices": [
    "$4x e^{x-1}$",
    "$e^x$",
    "$4e^x$",
    "$4$"
   ],
   "answer": 2,
   "why": [
    "The power rule does not apply here; $e^x$ is its own derivative and the 4 just rides along.",
    "You dropped the constant 4; the multiplier stays attached.",
    "Correct! The constant 4 comes along and $e^x$ is its own derivative, giving $4e^x$.",
    "The 4 stays multiplied by $e^x$; it does not become the whole answer."
   ]
  }
 ],
 "product-quotient": [
  {
   "q": "Using the product rule, what is the derivative of $f(x)=x^2 e^x$?",
   "choices": [
    "$2x\\,e^x$",
    "$2x\\,e^x + x^2 e^x$",
    "$2x\\,e^x \\cdot x^2 e^x$",
    "$x^2 e^x$"
   ],
   "answer": 1,
   "why": [
    "Not quite - that is only the first term; the product rule adds a second.",
    "Correct - $u'v+uv' = 2x\\,e^x + x^2 e^x$.",
    "Not quite - the product rule adds the two terms, it does not multiply them.",
    "Not quite - that is only the $u\\,v'$ term; you also need $u'\\,v$."
   ]
  },
  {
   "q": "Why is the derivative of a product NOT just the product of the derivatives?",
   "choices": [
    "Because derivatives can never be multiplied together",
    "Because $u'v'$ is only the tiny throwaway corner, missing the two main side strips",
    "Because you must always divide by $v^2$",
    "Because products don't have derivatives"
   ],
   "answer": 1,
   "why": [
    "Derivatives can be multiplied; that's just not what gives a product's rate of change.",
    "Correct: the rectangle picture shows $u'v$ and $uv'$ are the real growth, while $u'v'$ is negligible.",
    "Dividing by $v^2$ is the quotient rule and has nothing to do with this.",
    "Products absolutely have derivatives; we just need the right rule."
   ]
  },
  {
   "q": "Using the quotient rule, what is the derivative of $f(x) = \\frac{u}{v}$?",
   "choices": [
    "$\\frac{u'v + uv'}{v^2}$",
    "$\\frac{u' }{v'}$",
    "$\\frac{u'v - uv'}{v^2}$",
    "$u'v - uv'$"
   ],
   "answer": 2,
   "why": [
    "The quotient rule subtracts, it does not add, in the numerator.",
    "You can't just divide the derivatives, the same way you can't just multiply them.",
    "Correct: 'Low D-High minus High D-Low, over Low squared.'",
    "You forgot to divide by $v^2$, which is part of the pattern."
   ]
  }
 ],
 "chain-rule": [
  {
   "q": "The chain rule says the derivative of $f(g(x))$ equals:",
   "choices": [
    "$f'(g(x)) \\cdot g'(x)$",
    "$f'(x) \\cdot g'(x)$",
    "$f'(g'(x))$",
    "$f(g'(x))$"
   ],
   "answer": 0,
   "why": [
    "Correct: derivative of the outside (leaving the inside alone) times derivative of the inside.",
    "The outside derivative must be evaluated at $g(x)$, not just at $x$.",
    "You leave the inside alone in the outside step, you don't differentiate it there.",
    "The outside function itself must be differentiated, not left as $f$."
   ]
  },
  {
   "q": "Why do you MULTIPLY the outside and inside derivatives in the chain rule?",
   "choices": [
    "Because multiplying is easier than adding",
    "Because rates of change chain together: if outside is fast and inside is fast, the speeds multiply",
    "Because the inside derivative is always 1",
    "Because you actually should add them"
   ],
   "answer": 1,
   "why": [
    "It's not about ease; it's about how rates combine.",
    "Correct: like a car twice as fast as a bike that's 3x walking, the rates multiply (2 x 3).",
    "The inside derivative is usually not 1; that's why it matters.",
    "Chained rates multiply, they don't add."
   ]
  },
  {
   "q": "What is the derivative of $f(x) = e^{5x}$?",
   "choices": [
    "$e^{5x}$",
    "$5x \\cdot e^{5x}$",
    "$5e^{5x}$",
    "$e^{5}$"
   ],
   "answer": 2,
   "why": [
    "You forgot to multiply by the derivative of the inside, which is 5.",
    "The derivative of the inside $5x$ is just 5, not $5x$.",
    "Correct: $e^{5x}$ stays, then multiply by the inside's derivative, 5.",
    "The exponent doesn't disappear; $e^{5x}$ stays and gets multiplied by 5."
   ]
  }
 ],
 "implicit-related-rates": [
  {
   "q": "If $y$ depends on $x$, what is $\\dfrac{d}{dx}[y^2]$?",
   "choices": [
    "$2y$",
    "$2x$",
    "$2y\\,y'$",
    "$y^2\\,y'$"
   ],
   "answer": 2,
   "why": [
    "Not quite - $y$ is an inside function, so the chain rule also multiplies by $y'$.",
    "Not quite - the variable being squared is $y$, not $x$.",
    "Correct - power rule on the outside gives $2y$, then multiply by the derivative of the inside, $y'$.",
    "Not quite - the exponent must come down and drop by one, giving $2y$, before multiplying by $y'$."
   ]
  },
  {
   "q": "In a related rates problem, when should you substitute the known numbers?",
   "choices": [
    "Before differentiating, to simplify the equation",
    "After differentiating with respect to time",
    "Never; the answer stays symbolic",
    "Only into the left side of the equation"
   ],
   "answer": 1,
   "why": [
    "Not quite - a number substituted early has a rate of zero, so its whole term vanishes and the answer is wrong.",
    "Correct - relate the quantities, differentiate with respect to $t$, and only then put in the current values and rates.",
    "Not quite - the point is to get a number for the unknown rate, so substitution is required, just not first.",
    "Not quite - values go into every term once the differentiation is done."
   ]
  },
  {
   "q": "On the circle $x^2+y^2=25$, what is the slope at the point $(3,4)$?",
   "choices": [
    "$\\dfrac{3}{4}$",
    "$-\\dfrac{4}{3}$",
    "$0$",
    "$-\\dfrac{3}{4}$"
   ],
   "answer": 3,
   "why": [
    "Not quite - the sign is wrong; implicit differentiation gives $y'=-x/y$, which is negative here.",
    "Not quite - that is $-x/y$ upside down; the slope is $-3/4$, not $-4/3$.",
    "Not quite - the slope is zero only at the very top and bottom of the circle, not at $(3,4)$.",
    "Correct - $2x+2yy'=0$ gives $y'=-x/y=-3/4$."
   ]
  }
 ],
 "elasticity": [
  {
   "q": "When elasticity $E > 1$ (elastic), what should a business do to increase revenue?",
   "choices": [
    "Lower the price",
    "Raise the price",
    "Keep the price exactly the same",
    "Stop selling the product"
   ],
   "answer": 0,
   "why": [
    "Correct: customers are price-sensitive, so cutting price wins back more than enough sales.",
    "Raising price when elastic loses too many customers and revenue falls.",
    "Holding still leaves easy revenue on the table when demand is elastic.",
    "Elasticity guides pricing, it doesn't mean you should quit selling."
   ]
  },
  {
   "q": "If elasticity $E < 1$ (inelastic), the best move to raise revenue is to:",
   "choices": [
    "Lower the price",
    "Raise the price",
    "Give the product away free",
    "Do nothing because revenue can't change"
   ],
   "answer": 1,
   "why": [
    "Lowering price when customers barely react just throws away revenue.",
    "Correct: a 1% price rise loses less than 1% of customers, so revenue climbs.",
    "Free means no revenue at all, the opposite of the goal.",
    "Revenue does change with price; inelastic demand means raising it helps."
   ]
  },
  {
   "q": "For demand $q=1000-20p$ (so $f'(p)=-20$) at $p=30$ where $f(30)=400$, use $E=-\\dfrac{p\\,f'(p)}{f(p)}$. What is $E(30)$?",
   "choices": [
    "$1.5$",
    "$0.5$",
    "$2$",
    "$-1.5$"
   ],
   "answer": 0,
   "why": [
    "Correct - $E=-\\dfrac{30\\times(-20)}{400}=\\dfrac{600}{400}=1.5$.",
    "Not quite - recompute $\\dfrac{600}{400}$; it is $1.5$.",
    "Not quite - $\\dfrac{600}{400}=1.5$, not 2.",
    "Not quite - the minus sign out front makes $E$ positive, so $+1.5$."
   ]
  }
 ],
 "first-derivative-test": [
  {
   "q": "What is a critical number of a function $f$?",
   "choices": [
    "An $x$-value where $f'(x)=0$ or $f'(x)$ does not exist",
    "Any $x$-value where $f(x)=0$",
    "The largest value the function ever reaches",
    "An $x$-value where the function crosses the $y$-axis"
   ],
   "answer": 0,
   "why": [
    "That's it: a critical number is where the slope is flat or has no clear value, the only places a peak or valley can hide.",
    "That describes a root of $f$ (where the output is zero), not a critical number, which is about the slope $f'$.",
    "That's an absolute maximum, a single output value, not the $x$-value where the slope behaves specially.",
    "That's the $y$-intercept, which has nothing to do with where the slope is zero or undefined."
   ]
  },
  {
   "q": "As you move left to right across a critical number, the sign of $f'$ goes positive then negative. What is happening there?",
   "choices": [
    "A local minimum (a valley)",
    "A local maximum (a peak)",
    "An inflection point",
    "Nothing special, just a flat pause"
   ],
   "answer": 1,
   "why": [
    "A valley is the opposite pattern: negative then positive (down then up).",
    "Correct: rising then falling (up then over the top then down) is exactly a peak, a local maximum.",
    "Inflection points are about concavity changing, not the first-derivative sign switching from positive to negative.",
    "A flat pause happens when the sign does not change; here it clearly switches, so it is a real peak."
   ]
  },
  {
   "q": "Find the critical number of $f(x)=x^2-6x+5$ by solving $f'(x)=0$.",
   "choices": [
    "$x=6$",
    "$x=3$",
    "$x=5$",
    "$x=-3$"
   ],
   "answer": 1,
   "why": [
    "Not quite - solve $2x-6=0$ for $x$, which gives 3.",
    "Correct - $f'(x)=2x-6=0$ gives $x=3$.",
    "Not quite - 5 is the constant in $f$, not where the slope is zero.",
    "Not quite - $2x-6=0$ gives $x=+3$, not $-3$."
   ]
  }
 ],
 "concavity": [
  {
   "q": "If $f''(x)>0$ on an interval, the curve is shaped like a:",
   "choices": [
    "Bowl (concave up)",
    "Dome (concave down)",
    "Straight line",
    "Sharp corner"
   ],
   "answer": 0,
   "why": [
    "Correct: $f''>0$ means concave up, a bowl or smile that holds water.",
    "A dome (concave down) is $f''(x)<0$, the mirror image.",
    "A straight line has $f''=0$ everywhere, with no bend at all.",
    "A corner is about $f'$ not existing, not about the sign of $f''$."
   ]
  },
  {
   "q": "Using the Second Derivative Test, if $c$ is a critical number and $f''(c)<0$, then $c$ is a:",
   "choices": [
    "Local minimum",
    "Local maximum",
    "Inflection point",
    "Endpoint"
   ],
   "answer": 1,
   "why": [
    "A local minimum is the bottom of a bowl, where $f''(c)>0$, the opposite sign.",
    "Right: $f''(c)<0$ means a dome there, and the top of a dome is a local maximum.",
    "An inflection point is where concavity changes, not where you classify a peak or valley.",
    "Endpoints come from the closed-interval method, not from the sign of the second derivative."
   ]
  },
  {
   "q": "If $f(x)=2x^3-9x^2+12x$, what is $f''(x)$?",
   "choices": [
    "$6x^2-18x+12$",
    "$12x-18$",
    "$6x-9$",
    "$12x-9$"
   ],
   "answer": 1,
   "why": [
    "Not quite - that is the first derivative $f'(x)$; differentiate once more.",
    "Correct - differentiating $f'(x)=6x^2-18x+12$ gives $f''(x)=12x-18$.",
    "Not quite - bring down each exponent carefully; the answer is $12x-18$.",
    "Not quite - the constant 12 differentiates to 0, leaving $12x-18$."
   ]
  }
 ],
 "absolute-extrema": [
  {
   "q": "On a closed interval $[a,b]$, where can the absolute max and min of a smooth curve occur?",
   "choices": [
    "Only at the midpoint of the interval",
    "Only where $f(x)=0$",
    "At a critical number inside the interval or at an endpoint",
    "Only at inflection points"
   ],
   "answer": 2,
   "why": [
    "There is nothing special about the midpoint; the extremes hide at critical numbers or endpoints.",
    "Where $f(x)=0$ is about the output being zero, not about being highest or lowest.",
    "Correct: the only suspects are interior critical numbers and the two endpoints.",
    "Inflection points are about bending, not about where the highest or lowest values sit."
   ]
  },
  {
   "q": "What is the absolute maximum of $f(x)=x^2$ on $[1,4]$?",
   "choices": [
    "$1$",
    "$16$",
    "$8$",
    "$0$"
   ],
   "answer": 1,
   "why": [
    "Not quite - $f(1)=1$ is the minimum on this interval, not the max.",
    "Correct - $f(4)=4^2=16$ is the largest value, at the right endpoint.",
    "Not quite - check the endpoints; $f(4)=16$ is larger.",
    "Not quite - $x=0$ is not even inside $[1,4]$, so it does not count."
   ]
  },
  {
   "q": "Why must you check the endpoints when finding absolute extrema on $[a,b]$?",
   "choices": [
    "Because the slope is always zero at endpoints",
    "Because the highest or lowest value can sit at an endpoint even when the slope is not zero",
    "Because endpoints are always the maximum",
    "Because critical numbers do not matter on closed intervals"
   ],
   "answer": 1,
   "why": [
    "The slope is usually not zero at an endpoint; that is exactly why the test for critical numbers would miss it.",
    "Right: at an endpoint you run out of room to step further, so it can be the extreme even with a nonzero slope.",
    "Endpoints are only sometimes the extreme; you still have to compare them against the critical numbers.",
    "Critical numbers absolutely matter; endpoints are checked in addition to them, not instead of them."
   ]
  }
 ],
 "optimization": [
  {
   "q": "Revenue is $R(p)=600p-20p^2$. Which price maximizes it (solve $R'(p)=0$)?",
   "choices": [
    "$p=15$",
    "$p=30$",
    "$p=600$",
    "$p=20$"
   ],
   "answer": 0,
   "why": [
    "Correct - $R'(p)=600-40p=0$ gives $p=15$.",
    "Not quite - $600-40p=0$ gives $p=15$, not 30.",
    "Not quite - 600 is a coefficient, not the solution of $600-40p=0$.",
    "Not quite - solve $600-40p=0$ carefully: $p=15$."
   ]
  },
  {
   "q": "After writing the quantity as a one-variable function, what do you do to find the candidate max or min?",
   "choices": [
    "Set the function itself equal to zero",
    "Take the derivative and set it equal to zero",
    "Take the derivative and set it equal to one",
    "Add up all the variables"
   ],
   "answer": 1,
   "why": [
    "Setting the function to zero finds where the output is zero, not where the peak or valley is.",
    "Correct: the max or min sits where the slope is zero, so you differentiate and solve $f'=0$.",
    "The slope at a peak or valley is zero, not one.",
    "Adding the variables does nothing useful; you need the derivative to locate the flat spot."
   ]
  },
  {
   "q": "After solving for the candidate, how can you confirm it is really a maximum?",
   "choices": [
    "Check that the second derivative is negative (concave down)",
    "Check that the second derivative is positive (concave up)",
    "Check that the function value is positive",
    "Check that the candidate is a whole number"
   ],
   "answer": 0,
   "why": [
    "Correct: $f''<0$ means concave down, a dome, so the candidate is a maximum.",
    "A positive second derivative is concave up, a bowl, which would confirm a minimum instead.",
    "A positive output value does not tell you whether it is a peak or a valley.",
    "Whether the candidate is a whole number says nothing about it being a max or min."
   ]
  }
 ],
 "antiderivatives": [
  {
   "q": "Integration is best described as the reverse of which operation?",
   "choices": [
    "Differentiation",
    "Multiplication",
    "Taking a square root",
    "Adding fractions"
   ],
   "answer": 0,
   "why": [
    "Correct - integration undoes differentiation, just like subtraction undoes addition.",
    "Multiplication is undone by division, not by integration.",
    "Square-rooting is undone by squaring, which is a separate idea.",
    "Adding fractions has nothing to do with integration; the lesson pairs integration with differentiation."
   ]
  },
  {
   "q": "Why does an indefinite integral always include a $+C$?",
   "choices": [
    "Because every integral must end in a constant by tradition.",
    "Because a constant differentiates to 0, so the original constant can't be recovered.",
    "Because $C$ stands for the variable you integrate with respect to.",
    "Because the integral sign requires a number after it."
   ],
   "answer": 1,
   "why": [
    "It is not just tradition; there is a real reason any constant could have been there.",
    "Correct - since the derivative of any constant is 0, reversing the process can't tell which constant was present, so $+C$ covers them all.",
    "The variable of integration is shown by the $dx$, not by $C$.",
    "Nothing forces a number after the integral sign; the $C$ exists because constants vanish when differentiating."
   ]
  },
  {
   "q": "What is an antiderivative of $2x$?",
   "choices": [
    "$2$",
    "$x^2$",
    "$2x^2$",
    "$\\frac{x^2}{2}$"
   ],
   "answer": 1,
   "why": [
    "The derivative of $2$ is $0$, not $2x$.",
    "Correct - the derivative of $x^2$ is $2x$, so $x^2$ is an antiderivative of $2x$.",
    "The derivative of $2x^2$ is $4x$, which is too big.",
    "The derivative of $\\frac{x^2}{2}$ is $x$, not $2x$."
   ]
  }
 ],
 "substitution": [
  {
   "q": "Substitution is the reverse of which differentiation rule?",
   "choices": [
    "The power rule",
    "The product rule",
    "The chain rule",
    "The constant rule"
   ],
   "answer": 2,
   "why": [
    "The power rule handles simple bare terms, not the nested functions substitution unwinds.",
    "The product rule is a different pattern; substitution is not its reverse.",
    "Correct - the chain rule builds nested functions, and substitution unwinds them when integrating.",
    "The constant rule just sends constants to 0 and is unrelated here."
   ]
  },
  {
   "q": "In substitution, what should you choose as $u$?",
   "choices": [
    "The inner (messy) function",
    "The whole integral",
    "The $dx$ at the end",
    "Any random part of the expression"
   ],
   "answer": 0,
   "why": [
    "Correct - you rename the inner function as $u$, which is step 1 of the method.",
    "You substitute for the inner piece, not the entire integral at once.",
    "The $dx$ becomes $du$ later; it is not what you call $u$.",
    "The choice is not random; you pick the inner function so the integral collapses."
   ]
  },
  {
   "q": "Using substitution, what is $\\int e^{5x}\\,dx$?",
   "choices": [
    "$5e^{5x}+C$",
    "$e^{5x}+C$",
    "$\\frac{e^{5x}}{5}+C$",
    "$e^{5}x+C$"
   ],
   "answer": 2,
   "why": [
    "Multiplying by 5 is the derivative direction; integrating divides by 5 instead.",
    "Plain $e^{5x}$ is the integrand, not its integral; the inner $5x$ needs accounting for.",
    "Correct - with $u=5x$ you get $\\frac{e^{5x}}{5}+C$, and differentiating it gives back $e^{5x}$.",
    "That misreads $e^{5x}$; the exponent is $5x$, not a separate $5$ times $x$."
   ]
  }
 ],
 "riemann-sums": [
  {
   "q": "Using 2 left-corner rectangles, estimate the area under $f(x)=x^2$ on $[0,2]$.",
   "choices": [
    "$5$",
    "$1$",
    "$2.5$",
    "$4$"
   ],
   "answer": 1,
   "why": [
    "Not quite - $5$ is the right sum ($f(1)+f(2)$ times width 1); left corners use $f(0)$ and $f(1)$.",
    "Correct - width $1$, heights $f(0)=0$ and $f(1)=1$, so the sum is $(0+1)\\times 1=1$.",
    "Not quite - that averages the left and right sums; the left sum alone is $1$.",
    "Not quite - $4$ is the height of the curve at $x=2$, not a sum of rectangle areas."
   ]
  },
  {
   "q": "As the number of rectangles $n$ grows without bound, a Riemann sum approaches:",
   "choices": [
    "Zero, because each rectangle becomes infinitely thin",
    "Infinity, because there are infinitely many rectangles",
    "The exact area under the curve, the definite integral",
    "The height of the tallest rectangle"
   ],
   "answer": 2,
   "why": [
    "Not quite - each rectangle shrinks, but there are more of them; the total settles on a finite number.",
    "Not quite - the count grows but the widths shrink to match; the sum converges rather than blowing up.",
    "Correct - the limit of the Riemann sums is the definite integral, the exact area.",
    "Not quite - the sum measures area, not any single height."
   ]
  },
  {
   "q": "For a function that is increasing on the interval, a left-corner Riemann sum is always:",
   "choices": [
    "An underestimate of the true area",
    "An overestimate of the true area",
    "Exactly equal to the true area",
    "Equal to the right-corner sum"
   ],
   "answer": 0,
   "why": [
    "Correct - on a rising curve each strip's left edge is its lowest point, so every rectangle sits under the curve.",
    "Not quite - that describes the right-corner sum on an increasing function.",
    "Not quite - only in the limit do the sums equal the area; any finite left sum falls short on a rising curve.",
    "Not quite - the two sums differ by the difference of the first and last heights times the width."
   ]
  }
 ],
 "definite-integral": [
  {
   "q": "A definite integral $\\int_a^b f(x)\\,dx$ gives back what?",
   "choices": [
    "A function plus $C$",
    "A single number (the signed area)",
    "A new variable",
    "The slope at a point"
   ],
   "answer": 1,
   "why": [
    "That describes an indefinite integral; adding the two limits removes the $+C$.",
    "Correct - with limits attached, the result is one number equal to the signed area from $a$ to $b$.",
    "It does not produce a variable; it produces a definite numerical value.",
    "Slope at a point is a derivative idea, not what a definite integral measures."
   ]
  },
  {
   "q": "What does \"signed\" area mean for a definite integral?",
   "choices": [
    "Area is always counted as positive.",
    "Area above the x-axis is positive and area below is negative.",
    "You must sign your name before computing it.",
    "The area is doubled before adding."
   ],
   "answer": 1,
   "why": [
    "Area is not always positive; pieces below the axis count as negative.",
    "Correct - regions above the x-axis add, regions below subtract, so the total can be negative.",
    "That is just a play on the word; signed refers to positive versus negative area.",
    "Nothing gets doubled; signed simply tracks above versus below the axis."
   ]
  },
  {
   "q": "If $\\int_1^4 f\\,dx=7$ and $\\int_1^4 g\\,dx=3$, what is $\\int_1^4 (2f-g)\\,dx$?",
   "choices": [
    "$11$",
    "$17$",
    "$4$",
    "$8$"
   ],
   "answer": 0,
   "why": [
    "Correct - $2(7)-3=14-3=11$.",
    "Not quite - that adds the $g$ integral; it must be subtracted: $2(7)-3=11$.",
    "Not quite - that is $7-3$; remember to double the first integral.",
    "Not quite - only the $f$ integral is doubled, not $g$: $2(7)-3=11$."
   ]
  }
 ],
 "ftc": [
  {
   "q": "The Fundamental Theorem of Calculus says $\\int_a^b f(x)\\,dx$ equals what?",
   "choices": [
    "$F(a)-F(b)$",
    "$F(b)-F(a)$",
    "$F(b)+F(a)$",
    "$f(b)-f(a)$"
   ],
   "answer": 1,
   "why": [
    "That is the right pieces in the wrong order; top minus bottom is $F(b)-F(a)$.",
    "Correct - find an antiderivative $F$, then subtract: plug in the top limit minus the bottom limit.",
    "You subtract, not add, the two values of the antiderivative.",
    "You use the antiderivative $F$, not the original $f$, at the limits."
   ]
  },
  {
   "q": "Why can you ignore the $+C$ when computing a definite integral?",
   "choices": [
    "Because $C$ is always equal to 0.",
    "Because the $C$ cancels when you subtract $F(a)$ from $F(b)$.",
    "Because definite integrals are not real integrals.",
    "Because $C$ only matters for negative limits."
   ],
   "answer": 1,
   "why": [
    "$C$ is not always 0; it simply drops out of the subtraction.",
    "Correct - $(F(b)+C)-(F(a)+C)$ cancels the $C$'s, leaving $F(b)-F(a)$.",
    "Definite integrals are very real; the $C$ just cancels in the subtraction.",
    "The limits being negative changes nothing; the $C$ always cancels."
   ]
  },
  {
   "q": "What is $\\int_0^2 4x\\,dx$?",
   "choices": [
    "$4$",
    "$16$",
    "$8$",
    "$2$"
   ],
   "answer": 2,
   "why": [
    "That skips the evaluation; you must compute $F(2)-F(0)$ with $F(x)=2x^2$.",
    "$16$ would be $4(2)^2$ without dividing correctly; the antiderivative is $2x^2$, giving $8$.",
    "Correct - $F(x)=2x^2$, so $2(2)^2-2(0)^2=8-0=8$.",
    "$2$ ignores the antiderivative step; evaluating $2x^2$ from 0 to 2 gives $8$."
   ]
  }
 ],
 "integration-by-parts": [
  {
   "q": "The integration by parts formula is:",
   "choices": [
    "$\\int u\\,dv = uv + \\int v\\,du$",
    "$\\int u\\,dv = uv - \\int v\\,du$",
    "$\\int u\\,dv = \\int u\\,dx \\cdot \\int dv$",
    "$\\int u\\,dv = u'v - uv'$"
   ],
   "answer": 1,
   "why": [
    "Not quite - the sign is wrong; moving one integral of the product rule to the other side produces a minus.",
    "Correct - it is the product rule integrated and rearranged: $\\int u\\,dv = uv - \\int v\\,du$.",
    "Not quite - an integral of a product is never the product of integrals.",
    "Not quite - that is the shape of the product rule itself, not its integrated form."
   ]
  },
  {
   "q": "For $\\int x\\,e^x\\,dx$, which choice of $u$ makes the method work, and why?",
   "choices": [
    "$u=e^x$, because it is its own derivative",
    "$u=x$, because differentiating it gives a constant, which simplifies the new integral",
    "$u=x\\,e^x$, the whole integrand",
    "$u=dx$"
   ],
   "answer": 1,
   "why": [
    "Not quite - with $u=e^x$ the new integral contains $x^2 e^x$, which is harder than what you started with.",
    "Correct - $u=x$ gives $du=dx$, and the leftover integral is just $\\int e^x\\,dx$.",
    "Not quite - $u$ must be one factor of the product, not the whole thing.",
    "Not quite - $dx$ belongs with $dv$; $u$ is a function."
   ]
  },
  {
   "q": "What is $\\int \\ln x\\,dx$?",
   "choices": [
    "$\\dfrac{1}{x}+C$",
    "$\\ln x + C$",
    "$x\\ln x - x + C$",
    "$x\\ln x + C$"
   ],
   "answer": 2,
   "why": [
    "Not quite - $\\dfrac{1}{x}$ is the derivative of $\\ln x$, the opposite direction.",
    "Not quite - $\\ln x$ is not its own antiderivative; differentiate it and you get $\\dfrac{1}{x}$, not $\\ln x$.",
    "Correct - parts with $u=\\ln x$ and $dv=dx$ gives $x\\ln x-\\int 1\\,dx=x\\ln x-x+C$.",
    "Not quite - differentiating $x\\ln x$ gives $\\ln x+1$, so the extra $-x$ is needed to cancel the $+1$."
   ]
  }
 ],
 "area-between-curves": [
  {
   "q": "To find the area between two curves on $[a,b]$, what do you integrate?",
   "choices": [
    "$\\int_a^b[\\text{top}-\\text{bottom}]\\,dx$",
    "$\\int_a^b[\\text{bottom}-\\text{top}]\\,dx$",
    "$\\int_a^b[\\text{top}+\\text{bottom}]\\,dx$",
    "$\\int_a^b[\\text{top}\\cdot\\text{bottom}]\\,dx$"
   ],
   "answer": 0,
   "why": [
    "Correct: you integrate the top curve minus the bottom curve across the interval.",
    "Subtracting in this order gives a negative number; just swap them since real area is positive.",
    "Adding the curves does not measure the gap between them, so it is not the area between them.",
    "Multiplying the curves has no meaning here; area between curves uses subtraction."
   ]
  },
  {
   "q": "Picture a thin vertical strip of the region at position $x$. What is its area?",
   "choices": [
    "height plus width",
    "(top minus bottom) times $dx$",
    "(top minus bottom) squared",
    "just the width $dx$"
   ],
   "answer": 1,
   "why": [
    "Adding a height and a width does not give an area; you multiply them.",
    "Correct: each strip is a tiny rectangle, height (top minus bottom) times width $dx$.",
    "Squaring the height is not how rectangle area works; it is height times width.",
    "The width alone is just a length; you must multiply it by the strip's height."
   ]
  },
  {
   "q": "What is the area between $y=x$ and $y=x^2$ from $x=0$ to $x=1$?",
   "choices": [
    "$\\dfrac{1}{6}$",
    "$\\dfrac{1}{2}$",
    "$1$",
    "$\\dfrac{1}{3}$"
   ],
   "answer": 0,
   "why": [
    "Correct - $\\int_0^1 (x-x^2)\\,dx=\\dfrac{1}{2}-\\dfrac{1}{3}=\\dfrac{1}{6}$.",
    "Not quite - $\\dfrac{1}{2}$ is just $\\int_0^1 x\\,dx$; subtract the bottom curve too.",
    "Not quite - the gap between the curves is small here, only $\\dfrac{1}{6}$.",
    "Not quite - $\\dfrac{1}{3}$ is $\\int_0^1 x^2\\,dx$; subtract it from $\\dfrac{1}{2}$."
   ]
  }
 ],
 "surplus": [
  {
   "q": "On a graph, consumer surplus is the area that is:",
   "choices": [
    "below the demand curve and above the price line",
    "above the demand curve and below the price line",
    "below the supply curve and above the price line",
    "above the supply curve and below the price line"
   ],
   "answer": 0,
   "why": [
    "Correct: consumer surplus is the savings area below demand and above the price line.",
    "This region is flipped; consumer surplus sits below demand, not above it.",
    "This uses the supply curve, but consumer surplus is measured against the demand curve.",
    "That description is producer surplus, not consumer surplus."
   ]
  },
  {
   "q": "Producer surplus is the area:",
   "choices": [
    "below the demand curve and above the price line",
    "above the supply curve and below the price line",
    "below the supply curve and above the price line",
    "above the demand curve and below the price line"
   ],
   "answer": 1,
   "why": [
    "That description is consumer surplus, which uses the demand curve.",
    "Correct: producer surplus is the extra earned, the area above supply and below the price line.",
    "This region is flipped; producer surplus sits above the supply curve, not below it.",
    "Producer surplus uses the supply curve, not the demand curve."
   ]
  },
  {
   "q": "For demand $D(x)=50-0.1x$ and supply $S(x)=10+0.1x$, what is the equilibrium quantity?",
   "choices": [
    "$x=100$",
    "$x=200$",
    "$x=400$",
    "$x=40$"
   ],
   "answer": 1,
   "why": [
    "Not quite - set $50-0.1x=10+0.1x$; combining gives $0.2x=40$.",
    "Correct - $50-0.1x=10+0.1x$ gives $40=0.2x$, so $x=200$.",
    "Not quite - solve $0.2x=40$, which gives $x=200$.",
    "Not quite - 40 is the gap $50-10$; divide by $0.2$ to get $x=200$."
   ]
  }
 ],
 "income-streams": [
  {
   "q": "To find the present value of a dollar arriving later, you multiply it by:",
   "choices": [
    "$e^{rt}$",
    "$e^{-rt}$",
    "$rt$",
    "$1+rt$"
   ],
   "answer": 1,
   "why": [
    "$e^{rt}$ grows money forward; present value runs that in reverse.",
    "Correct: discounting multiplies future money by the discount factor $e^{-rt}$.",
    "$rt$ is just the exponent, not the discount factor itself.",
    "$1+rt$ is simple interest, not the continuous discount factor."
   ]
  },
  {
   "q": "Why is a dollar arriving five years from now worth less than a dollar today?",
   "choices": [
    "Because money loses its color over time",
    "Because future dollars are taxed twice",
    "Because today's dollar could be invested and grow",
    "Because banks refuse to hold old dollars"
   ],
   "answer": 2,
   "why": [
    "This is not a real reason; dollars do not change in any such way.",
    "Double taxation is not the reason; discounting comes from the chance to invest today.",
    "Correct: a dollar today can be invested to grow, so future dollars are worth less now.",
    "This is not true and is not why future money is discounted."
   ]
  },
  {
   "q": "An income of 10,000 dollars per year flows in continuously for 5 years at a 6% rate. Using $PV=\\dfrac{R\\,(1-e^{-rT})}{r}$ with $e^{-0.3}\\approx 0.7408$, the present value is about:",
   "choices": [
    "$43,200",
    "$50,000",
    "$30,000",
    "$7,408"
   ],
   "answer": 0,
   "why": [
    "Correct - 10000(1 - 0.7408)/0.06 = 2592/0.06, about $43,200.",
    "Not quite - $50,000 is the undiscounted total; discounting makes it less.",
    "Not quite - recompute 2592/0.06; it is about $43,200.",
    "Not quite - 0.7408 is only the discount factor, not the present value."
   ]
  }
 ]
};
