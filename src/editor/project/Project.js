(function () {
  "use strict";

  var Project = function(editor) {
    this.Container_constructor();

    // Variables
    this._id = b3.createUUID();
    this._editor = editor;
    this._selectedTree = null;
    this._clipboard = null;
    this._nodes = {};

    // Managers
    this.trees = null;
    this.nodes = null;
    this.history = null;

    this._initialize();
  };
  var p = createjs.extend(Project, createjs.Container);

  p._initialize = function() {
    this.trees = new b3e.project.TreeManager(this._editor, this);
    this.nodes = new b3e.project.NodeManager(this._editor, this);
    this.history = new b3e.project.HistoryManager(this._editor, this);

    var default_nodes = [
      {
        name         : 'root',
        category     : 'root',
        title        : 'My tree',
        description  : 'The root of this tree.  The title of this node sets the title of the tree.  You must have one tree called "Root".  You can set tree-wide properties on this node and reference them in other places with the following template syntax: `{{key_name}}`.' ,
      },
      {
        name         : 'sequence',
        category     : 'composite',
        title        : 'Sequence',
        description  : 'Takes multiple children and runs them from top to bottom (or left to right).  If any fail, this node fails, if all succeed, this node succeeds.',
      },
      {
        name         : 'select',
        category     : 'composite',
        title        : 'Select',
        description  : 'Takes multiple children and runs them from top to bottom (or left to right), succeeding when any one succeeds.  Fails if all fail.',
      },
      {
        name         : 'random',
        category     : 'composite',
        title        : 'Random',
        description  : 'Takes multiple children and runs one of them at random.',
      },
      {
        name         : 'random_weighted',
        category     : 'composite',
        title        : 'Random weighted',
        description  : 'Takes multiple children and runs one of them at random based on their weightings.  Each child node MUST have a "weight" property with a value greater than 0.',
      },
      {
        name         : 'repeat_n',
        category     : 'decorator',
        title        : 'Repeat <n>x',
        description  : 'Takes one child and runs it "n" times, where "n" is defined in this node\'s properties.',
        properties   : {n: 2}
      },
      {
        name         : 'repeat_until_fail',
        category     : 'decorator',
        title        : 'Repeat until fail',
        description  : 'Takes one child which it repeats until it fails.  This node always succeeds.',
      },
      {
        name         : 'repeat_until_succeed',
        category     : 'decorator',
        title        : 'Repeat until succeed',
        description  : 'Takes one child which it repeats until it succeeds.  This node always succeeds.',
      },
      {
        name         : 'negate',
        category     : 'decorator',
        title        : 'Negate',
        description  : 'Takes one child.  If that child succeeds, this node fails, and vice versa.',
      },
      {
        name         : 'always_fail',
        category     : 'decorator',
        title        : 'Always fail',
        description  : 'Takes one child and fails regardless of its outcome.',
      },
      {
        name         : 'always_succeed',
        category     : 'decorator',
        title        : 'Always succeed',
        description  : 'Takes one child and succeeds regardless of its outcome.',
      },
      {
        name         : 'runner',
        category     : 'action',
        title        : 'Module.function(1, 2, 3)',
        description  : 'An action that calls the function specified in the title (must be in valid Elixir terms).  The title can contain "template variables" (like `{{mod}}.rename({{new_name}}, true)`) which will be replaced with corresponding values looked up on the parent tree.',
      },
      {
        name         : 'wait',
        category     : 'action',
        title        : 'wait(1)',
        description  : '"Pauses" the bot for the specified number of seconds.  You can specify two numbers (like `wait(1,10)`) to wait a random number of seconds between those numbers.',
      },
      {
        name         : 'error',
        category     : 'action',
        title        : 'error("Oops...")',
        description  : 'Raises an error with the supplied message.',
      },
      {
        name         : 'log',
        category     : 'action',
        title        : 'log("Info...")',
        description  : 'Logs the specified message.',
      },
      {
        name         : 'succeed_rate',
        category     : 'action',
        title        : 'succeed_rate(0.5)',
        description  : 'Succeeds randomly at the specified rate, expressed as a number between 0 and 1.  For example, a rate of 0.25 will succeed one out of every 4 times on average.',
      },
      {
        name         : 'done',
        category     : 'action',
        title        : 'done()',
        description  : 'Stops the behavior tree.',
      },
    ];

    default_nodes.forEach(function(node_spec) {this.nodes.add(node_spec, true);}, this);

    this._applySettings(this._editor._settings);
    this.history.clear();
    this._editor.clearDirty();
  };

  p._applySettings = function(settings) {
    this.trees._applySettings(settings);
    this.nodes._applySettings(settings);
    this.history._applySettings(settings);
  };

  b3e.project.Project = createjs.promote(Project, 'Container');
})();
