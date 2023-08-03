module.exports = {
  prompt: ({ inquirer }) => {
    const questions = [
      {
        type: "select",
        name: "category",
        message: "Which FSD category?",
        choices: ["shared/ui", "features", "entities", "pages", "widgets"],
      },
      {
        type: "input",
        name: "component_name",
        message: "What is the component name?",
      },
    ];

    return inquirer.prompt(questions).then((answers) => {
      const { category, component_name } = answers;
      const path = `${category}/${component_name}`;
      const absPath = `src/${path}`;

      return { ...answers, path, absPath, category };
    });
  },
};
