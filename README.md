# Behavior Tree Editor

This tool has been adapbed for the [Bot Testing
Framework](https://git.corp.adobe.com/pages/BotTestingFramework/bot_army/readme.html)
based on the existing [Behavior3
Editor](https://github.com/behavior3/behavior3editor/)

![interface preview](preview.png)


## Basic usage

- Drag nodes from the left sidebar, drag the node "handles" to connect nodes
- Press "a" to auto organize the tree
- Make new trees under "Project/New tree" or hover over "Trees" side bar divider
- You can drag the tree names just like other nodes to nest trees
- You must name one tree "Root" (the name of the tree is set via the title of the tree's root node)
- Shift+click to drag (or middle mouse button)
- Del key deletes a node
- Each node has details/instructions in its description
- Be sure to save via the menu icon or cntr+s or "Project/Save project"
- You can create custom nodes via "Project/New node" or the Nodes sidebar divider.  Only action nodes with a "Name" of "action" can be parsed, and work just like the generic function nodes.
- Using "<key_name>" in a node's title will render the value for that property's key

## Main features

- **Custom Nodes**: you can create your own node types inside one of the three basic categories - *composite*, *decorator*, *action*.
- **Individual Node Properties**: you can modify node titles, description and custom properties.
- **Manual and Auto Organization**: organize by dragging nodes around or just type "a" to auto organize the whole tree.
- **Create and Manage Multiple Trees**: you can create and manage an unlimited number of trees.
- **Import and Export to JSON**: export your project, tree or nodes to JSON format.
- Import them back. Use JSON on your own custom library or tool. You decide.

