pragma solidity ^0.8.1;

import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AutoTrader {
       ISwapRouter public immutable swapRouter;
       address private owner;

       constructor(address _swapRouter) {
           swapRouter = ISwapRouter(_swapRouter);
           owner = msg.sender;
       }

       modifier onlyOwner() {
           require(msg.sender == owner, "Not the contract owner");
           _;
       }

       function approveToken(address token, uint256 amount) external onlyOwner {
           IERC20(token).approve(address(swapRouter), amount);
       }

       function swapExactInputSingle(
           address tokenIn,
           address tokenOut,
           uint256 amountIn,
           uint256 amountOutMin,
           uint24 fee,
           uint160 sqrtPriceLimitX96
       ) external onlyOwner returns (uint256 amountOut) {
           IERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn);

           ISwapRouter.ExactInputSingleParams memory params =
               ISwapRouter.ExactInputSingleParams({
                   tokenIn: tokenIn,
                   tokenOut: tokenOut,
                   fee: fee,
                   recipient: msg.sender,
                   deadline: block.timestamp,
                   amountIn: amountIn,
                   amountOutMinimum: amountOutMin,
                   sqrtPriceLimitX96: sqrtPriceLimitX96
               });

           amountOut = swapRouter.exactInputSingle(params);
       }
   }
