/**
 * Scenario Generator Utility
 * Generates narrative text based on selected technology, consequence, timeframe, and tone
 */

/**
 * Generate a scenario narrative based on the provided parameters
 * @param {Object} technology - The selected technology object
 * @param {Object} consequence - The selected consequence object
 * @param {Object} timeframe - The selected timeframe object
 * @param {String} tone - The narrative tone (utopian, dystopian, ambiguous)
 * @returns {Object} - The generated scenario with title and narrative text
 */
export function generateScenario(technology, consequence, timeframe, tone) {
  // Generate a title for the scenario
  const title = generateTitle(technology, consequence, timeframe, tone);
  
  // Generate the narrative text
  const narrative = generateNarrative(technology, consequence, timeframe, tone);
  
  return {
    title,
    narrative,
    technology,
    consequence,
    timeframe,
    tone,
    date: new Date().toISOString()
  };
}

/**
 * Generate a title for the scenario
 */
function generateTitle(technology, consequence, timeframe, tone) {
  const titles = {
    utopian: [
      `${technology.name}: A Bright Future for ${consequence.name}`,
      `The Promise of ${technology.name} in ${timeframe.name}`,
      `How ${technology.name} Will Revolutionize ${consequence.name}`
    ],
    dystopian: [
      `The Dark Side of ${technology.name}: ${consequence.name} at Risk`,
      `${technology.name}: A Threat to ${consequence.name} by ${timeframe.name}`,
      `When ${technology.name} Goes Wrong: The Future of ${consequence.name}`
    ],
    ambiguous: [
      `${technology.name} and ${consequence.name}: An Uncertain Future`,
      `Balancing Progress and Risk: ${technology.name} in ${timeframe.name}`,
      `The Complex Reality of ${technology.name} and ${consequence.name}`
    ]
  };
  
  // Select a random title from the appropriate tone category
  const titleOptions = titles[tone] || titles.ambiguous;
  return titleOptions[Math.floor(Math.random() * titleOptions.length)];
}

/**
 * Generate the narrative text for the scenario
 */
function generateNarrative(technology, consequence, timeframe, tone) {
  // Introduction paragraphs based on tone
  const introductions = {
    utopian: `As we look toward ${timeframe.name}, the development of ${technology.name} presents unprecedented opportunities for positive transformation in ${consequence.name}. The convergence of technological innovation and human ingenuity is opening new frontiers that were once the realm of science fiction.`,
    
    dystopian: `The rapid advancement of ${technology.name} during ${timeframe.name} raises serious concerns about its impact on ${consequence.name}. As we rush headlong into this technological future, we may be overlooking critical risks that could fundamentally alter our society in troubling ways.`,
    
    ambiguous: `The evolution of ${technology.name} throughout ${timeframe.name} will likely have complex and multifaceted effects on ${consequence.name}. This technological shift presents both promising opportunities and significant challenges that must be carefully navigated.`
  };
  
  // Development paragraphs based on tone
  const developments = {
    utopian: `Experts predict that ${technology.examples[0]} will become increasingly sophisticated, enabling solutions to longstanding problems in ${consequence.name}. ${technology.examples[1]} may further enhance our capabilities, creating a positive feedback loop of innovation and improvement. These developments will likely emerge during ${timeframe.characteristics[0]}, with widespread adoption following shortly thereafter.`,
    
    dystopian: `The concerning trajectory of ${technology.examples[0]} could exacerbate existing problems related to ${consequence.name}. As ${technology.examples[1]} becomes more prevalent, we may see unintended consequences that undermine social cohesion and individual wellbeing. These negative impacts could begin to manifest during ${timeframe.characteristics[0]}, with more severe effects emerging over time.`,
    
    ambiguous: `The development of ${technology.examples[0]} will likely proceed unevenly, with both breakthroughs and setbacks affecting ${consequence.name} in various ways. ${technology.examples[1]} presents particular uncertainty, as its applications could either address or intensify current challenges. The timeline for these developments remains fluid, though ${timeframe.characteristics[0]} will likely be a critical period of transition.`
  };
  
  // Conclusion paragraphs based on tone
  const conclusions = {
    utopian: `Looking ahead, the integration of ${technology.name} into ${consequence.name} represents one of the most promising developments of ${timeframe.name}. With thoughtful implementation and continued innovation, we can harness these technologies to create a more equitable, sustainable, and prosperous future for all.`,
    
    dystopian: `As we approach ${timeframe.name}, urgent action is needed to mitigate the potential harms of ${technology.name} on ${consequence.name}. Without proper safeguards and critical reassessment of our technological trajectory, we risk creating problems that may prove difficult or impossible to reverse.`,
    
    ambiguous: `The future relationship between ${technology.name} and ${consequence.name} will ultimately be determined by the choices we make today and in the coming years. By maintaining a balanced perspective that acknowledges both opportunities and risks, we can work toward technological development that serves human flourishing in ${timeframe.name} and beyond.`
  };
  
  // Combine the paragraphs to form the complete narrative
  return `${introductions[tone] || introductions.ambiguous}\n\n${developments[tone] || developments.ambiguous}\n\n${conclusions[tone] || conclusions.ambiguous}`;
}

/**
 * Export the scenario as a text file
 * @param {Object} scenario - The scenario object to export
 * @returns {String} - The text content for download
 */
export function exportScenarioAsText(scenario) {
  const content = [
    `FUTURE SCENARIO: ${scenario.title}`,
    `Generated on: ${new Date(scenario.date).toLocaleDateString()}`,
    `\nTECHNOLOGY: ${scenario.technology.name}`,
    `CONSEQUENCE: ${scenario.consequence.name}`,
    `TIMEFRAME: ${scenario.timeframe.name}`,
    `TONE: ${scenario.tone.charAt(0).toUpperCase() + scenario.tone.slice(1)}`,
    `\n${scenario.narrative}`
  ].join('\n');
  
  return content;
}

/**
 * Copy scenario text to clipboard
 * @param {Object} scenario - The scenario object to copy
 * @returns {String} - The text content for clipboard
 */
export function copyScenarioToClipboard(scenario) {
  return exportScenarioAsText(scenario);
}