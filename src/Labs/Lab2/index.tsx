import "./index.css";
import ForegroundColors from "./Components/ForegroundColors";
import BackgroundColors from "./Components/BackgroundColors";
import Borders from "./Components/Borders";
import Padding from "./Components/Padding";
import Margins from "./Components/Margins";
import Corners from "./Components/Corners";
import Dimensions from "./Components/Dimensions";
import Positions from "./Components/Positions";
import Zindex from "./Components/Zindex";
import Float from "./Components/Float";
import GridLayout from "./Components/GridLayout";
import Flex from "./Components/Flex";
import ReactIconsSampler from "./Components/ReactIcons";
import { Container } from "react-bootstrap";
import BootstrapGrids from "./Components/Bootstrap/BootstrapGrids";
import ScreenSizeLabel from "./Components/ScreenSizeLabel";
import BootstrapTables from "./Components/Bootstrap/BootstrapTables";
import BootstrapLists from "./Components/Bootstrap/BootstrapLists";
import BootstrapForms from "./Components/Bootstrap/BootstrapForms";
import BootstrapNavigation from "./Components/Bootstrap/BootstrapNavigation";
export default function Lab2() {
    return (
        <Container>
            <h2>Lab 2 - Cascading Style Sheets</h2>
            <h3>Styling with the STYLE attribute</h3>
            <p>
                Style attribute allows configuring look and feel
                right on the element. Although it's very convenient
                it is considered bad practice and you should avoid
                using the style attribute
            </p>
            <div id="wd-css-id-selectors">
                <h3>ID selectors</h3>
                <p className="wd-class-selector">
                    Instead of changing the look and feel of all the
                    elements of the same name, e.g., P, we can refer to a specific element by its ID
                </p>
                <h4 className="wd-class-selector">
                    Here's another paragraph using a different ID and a different look and
                    feel
                </h4>
            </div>
            <div id="wd-css-document-structure">
                <div className="wd-selector-1">
                    <h3>Document structure selectors</h3>
                    <div className="wd-selector-2">
                        Selectors can be combined to refer elements in particular
                        places in the document
                        <p className="wd-selector-3">
                            This paragraph's red background is referenced as
                            <br />
                            .selector-2 .selector3<br />
                            meaning the descendant of some ancestor.<br />
                            <span className="wd-selector-4">
                                Whereas this span is a direct child of its parent
                            </span><br />
                            You can combine these relationships to create specific
                            styles depending on the document structure
                        </p>
                    </div>
                </div>
            </div>
            <ForegroundColors />
            <BackgroundColors />
            <Borders />
            <Padding />
            <Margins />
            <Corners />
            <Dimensions />
            <Positions />
            <Zindex />
            <Float />
            <GridLayout />
            <Flex />
            <ReactIconsSampler />
            <BootstrapGrids />
            <ScreenSizeLabel />
            <BootstrapTables />
            <BootstrapLists />
            <BootstrapForms />
            <BootstrapNavigation />
        </Container >
    );
}