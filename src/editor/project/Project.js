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
        name         : 'Root',
        category     : 'root',
        title        : 'My tree',
        description  : 'The root of this tree.  You can set tree-wide properties on this node and use them in an action\'s "args" property with this notation: `{{key_name}}`.' ,
        properties   : {}
      },
      {
        name         : 'sequence',
        category     : 'composite',
        title        : 'Sequence',
        description  : 'Takes multiple children and runs them from top to bottom (or left to right).  If any fail, this node fails, if all succeed, this node succeeds.',
        properties   : {}
      },
      {
        name         : 'select',
        category     : 'composite',
        title        : 'Select',
        description  : 'Takes multiple children and runs them from top to bottom (or left to right), succeeding when any one succeeds.  Fails if all fail.',
        properties   : {}
      },
      {
        name         : 'random',
        category     : 'composite',
        title        : 'Random',
        description  : 'Takes multiple children and runs one of them at random.',
        properties   : {}
      },
      {
        name         : 'random_weighted',
        category     : 'composite',
        title        : 'Random weighted',
        description  : 'Takes multiple children and runs one of them at random based on their weightings.  Each child node MUST have a "weight" property with a value greater than 0.',
        properties   : {}
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
        properties   : {}
      },
      {
        name         : 'repeat_until_succeed',
        category     : 'decorator',
        title        : 'Repeat until succeed',
        description  : 'Takes one child which it repeats until it succeeds.  This node always succeeds.',
        properties   : {}
      },
      {
        name         : 'negate',
        category     : 'decorator',
        title        : 'Negate',
        description  : 'Takes one child.  If that child succeeds, this node fails, and vice versa.',
        properties   : {}
      },
      {
        name         : 'always_fail',
        category     : 'decorator',
        title        : 'Always fail',
        description  : 'Takes one child and fails regardless of its outcome.',
        properties   : {}
      },
      {
        name         : 'always_succeed',
        category     : 'decorator',
        title        : 'Always succeed',
        description  : 'Takes one child and succeeds regardless of its outcome.',
        properties   : {}
      },
      {
        name         : 'runner',
        category     : 'action',
        title        : 'Module.function(1, 2, 3)',
        description  : 'An action that calls the function specified in the title (must be in valid Elixir terms).  The title can contain "template variables" (like `{{mod}}.rename({{new_name}}, true)`) which will be replaced with corresponding values looked up on the parent tree.',
        properties   : {}
      },
      {
        name         : 'wait',
        category     : 'action',
        title        : 'Wait <seconds> seconds',
        description  : '"Pauses" the bot for the number of seconds specified in the "seconds" property.  You can specify two numbers (like `1,10`) to wait a random number of seconds between those numbers.',
        properties   : {seconds: 1}
      },
      {
        name         : 'error',
        category     : 'action',
        title        : 'Error "<msg>"',
        description  : 'Raises an error with the message in the "msg" property',
        properties   : {msg: 'An error occurred...'}
      },
      {
        name         : 'log',
        category     : 'action',
        title        : 'Log "<msg>"',
        description  : 'Logs the message specified in the "msg" property',
        properties   : {msg: 'Info...'}
      },
      {
        name         : 'succeed_rate',
        category     : 'action',
        title        : 'Succeed rate <rate>',
        description  : 'Succeeds randomly at the specified rate, expressed as a number between 0 and 1.  For example, a rate of 0.25 will succeed one out of every 4 times on average.',
        properties   : {rate: 0.5}
      },
      {
        name         : 'done',
        category     : 'action',
        title        : 'Done',
        description  : 'Stops the behavior tree.',
        properties   : {}
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
