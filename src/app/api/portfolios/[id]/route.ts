import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/database';
import Portfolio from '@/models/Portfolio';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const portfolioData = await req.json();
    const { displayOrder: newDisplayOrder } = portfolioData;
    
    // Get the current portfolio to check its current display order
    const currentPortfolio = await Portfolio.findById((await params).id);
    if (!currentPortfolio) {
      return NextResponse.json({ success: false, error: 'Portfolio not found' }, { status: 404 });
    }
    
    // If display order is being changed
    if (newDisplayOrder !== currentPortfolio.displayOrder) {
      // Update other portfolios' display orders
      if (newDisplayOrder > currentPortfolio.displayOrder) {
        // Moving down: decrease orders of items in between
        await Portfolio.updateMany(
          { 
            displayOrder: { 
              $gt: currentPortfolio.displayOrder, 
              $lte: newDisplayOrder 
            },
            _id: { $ne: (await params).id }
          },
          { $inc: { displayOrder: -1 } }
        );
      } else {
        // Moving up: increase orders of items in between
        await Portfolio.updateMany(
          { 
            displayOrder: { 
              $gte: newDisplayOrder, 
              $lt: currentPortfolio.displayOrder 
            },
            _id: { $ne: (await params).id }
          },
          { $inc: { displayOrder: 1 } }
        );
      }
    }

    // Update the target portfolio
    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      (await params).id,
      portfolioData,
      { new: true }
    );

    return NextResponse.json({ success: true, portfolio: updatedPortfolio });
  } catch (error) {
    console.error('Error updating portfolio:', error);
    return NextResponse.json({ success: false, error: 'Failed to update portfolio' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const deletedPortfolio = await Portfolio.findByIdAndDelete((await params).id);

    if (!deletedPortfolio) {
      return NextResponse.json({ success: false, error: 'Portfolio not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting portfolio:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete portfolio' }, { status: 500 });
  }
}